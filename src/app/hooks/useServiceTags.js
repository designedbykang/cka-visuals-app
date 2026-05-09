export function deriveTagsFromServices(services) {
  const seen = new Set()
  const tags = []
  for (const svc of services) {
    for (const assignment of svc.service_tag_assignments || []) {
      if (!seen.has(assignment.tag_id)) {
        seen.add(assignment.tag_id)
        tags.push({ id: assignment.tag_id, label: assignment.tag_id.replace(/^tag-/, '').replace(/-/g, ' ') })
      }
    }
  }
  return tags
}
