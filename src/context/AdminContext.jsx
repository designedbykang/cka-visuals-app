'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const AdminContext = createContext()

export function AdminProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const resetAuthState = () => {
      setUser(null)
      setIsAdmin(false)
      setEditMode(false)
    }

    const isInvalidRefreshTokenError = (error) => {
      if (!error?.message) return false
      return (
        error.message.includes('Invalid Refresh Token') ||
        error.message.includes('Refresh Token Not Found')
      )
    }

    const clearBrokenSession = async () => {
      try {
        // Clear client-side tokens so auth can recover without retry loops.
        await supabase.auth.signOut({ scope: 'local' })
      } catch {
        // Ignore cleanup errors; local auth state is reset below.
      }
      resetAuthState()
    }

    // Check existing session on load
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          if (isInvalidRefreshTokenError(error)) {
            await clearBrokenSession()
            return
          }
          throw error
        }

        if (session) {
          await loadProfile(session.user)
        } else {
          resetAuthState()
        }
      } catch (error) {
        console.error('Failed to restore auth session:', error)
        resetAuthState()
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          await loadProfile(session.user)
        } else {
          resetAuthState()
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const loadProfile = async (authUser) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authUser.id)
      .single()

    setUser(authUser)
    const admin = profile?.role === 'admin'
    setIsAdmin(admin)
    setEditMode(admin)
  }

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
    setEditMode(false)
  }

  return (
    <AdminContext.Provider value={{
      user,
      isAdmin,
      editMode,
      loading,
      login,
      logout,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}
