"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react"

export interface CartItem {
  id: number
  title: string
  price: number
  discount: number
  quantity: number
  image: string
}

interface CartTotals {
  subtotal: number
  discount: number
  discountPercentage: number
  deliveryFee: number
  total: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  updateQuantity: (id: number, quantity: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  getCartTotal: () => CartTotals
  itemCount: number
}

const defaultTotals: CartTotals = {
  subtotal: 0,
  discount: 0,
  discountPercentage: 0,
  deliveryFee: 0,
  total: 0
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartTotal: () => defaultTotals,
  itemCount: 0,
})

export const useCart = () => useContext(CartContext)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage after mount
  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("cart") : null
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          // Schedule state update to avoid synchronous render cascade warning
          queueMicrotask(() => {
            setCartItems(parsed)
          })
        }
      } catch (err) {
        console.error("Failed to parse cart storage:", err)
      }
    }
  }, [])

  // Sync to localStorage on cart change
  const saveCart = useCallback((items: CartItem[]) => {
    try {
      localStorage.setItem("cart", JSON.stringify(items))
    } catch (err) {
      console.error("Failed to save cart storage:", err)
    }
  }, [])

  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id)
      let nextItems: CartItem[]

      if (existingItemIndex !== -1) {
        nextItems = [...prevItems]
        nextItems[existingItemIndex] = {
          ...nextItems[existingItemIndex],
          quantity: nextItems[existingItemIndex].quantity + item.quantity
        }
      } else {
        nextItems = [...prevItems, item]
      }
      saveCart(nextItems)
      return nextItems
    })
  }, [saveCart])

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setCartItems((prevItems) => {
      const nextItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
      saveCart(nextItems)
      return nextItems
    })
  }, [saveCart])

  const removeFromCart = useCallback((id: number) => {
    setCartItems((prevItems) => {
      const nextItems = prevItems.filter((item) => item.id !== id)
      saveCart(nextItems)
      return nextItems
    })
  }, [saveCart])

  const clearCart = useCallback(() => {
    setCartItems([])
    saveCart([])
  }, [saveCart])

  const itemCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }, [cartItems])

  const getCartTotal = useCallback((): CartTotals => {
    const rawSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const rawDiscount = cartItems.reduce(
      (sum, item) => sum + item.price * (item.discount / 100) * item.quantity,
      0
    )
    
    const subtotal = Math.round(rawSubtotal * 100) / 100
    const discount = Math.round(rawDiscount * 100) / 100
    const discountPercentage = rawSubtotal > 0 ? Math.round((rawDiscount / rawSubtotal) * 100) : 0
    const deliveryFee = subtotal > 0 ? 15 : 0
    const total = Math.max(0, Math.round((subtotal - discount + deliveryFee) * 100) / 100)

    return {
      subtotal,
      discount,
      discountPercentage,
      deliveryFee,
      total
    }
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
