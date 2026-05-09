import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useServiceMutations() {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  async function run(fn) {
    setSaving(true)
    setError(null)
    const { error: err } = await fn()
    if (err) setError(err)
    setSaving(false)
    return !err
  }

  async function updateService(id, fields) {
    return run(() => supabase.from('services').update(fields).eq('id', id))
  }

  async function updatePackage(id, fields) {
    return run(() => supabase.from('service_packages').update(fields).eq('id', id))
  }

  async function addPackage(serviceId, fields) {
    return run(() => supabase.from('service_packages').insert({ service_id: serviceId, ...fields }))
  }

  async function deletePackage(id) {
    return run(() => supabase.from('service_packages').delete().eq('id', id))
  }

  async function updateDeliverable(id, fields) {
    return run(() => supabase.from('service_deliverables').update(fields).eq('id', id))
  }

  async function addDeliverable(serviceId, label, orderIndex) {
    return run(() => supabase.from('service_deliverables').insert({
      service_id: serviceId,
      label,
      order_index: orderIndex,
    }))
  }

  async function deleteDeliverable(id) {
    return run(() => supabase.from('service_deliverables').delete().eq('id', id))
  }

  return {
    saving,
    error,
    updateService,
    updatePackage,
    addPackage,
    deletePackage,
    updateDeliverable,
    addDeliverable,
    deleteDeliverable,
  }
}
