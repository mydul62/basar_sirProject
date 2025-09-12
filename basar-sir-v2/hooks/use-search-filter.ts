"use client"

import { useState, useMemo } from "react"

interface UseSearchFilterProps<T> {
  data: T[]
  searchFields: (keyof T)[]
  filterFields: Record<string, keyof T>
}

export function useSearchFilter<T>({ data, searchFields, filterFields }: UseSearchFilterProps<T>) {
  const [searchValue, setSearchValue] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})

  const filteredData = useMemo(() => {
    let filtered = data

    // Apply search filter
    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase()
      filtered = filtered.filter((item) =>
        searchFields.some((field) => {
          const value = item[field]
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchLower)
          }
          if (Array.isArray(value)) {
            return value.some((v) => typeof v === "string" && v.toLowerCase().includes(searchLower))
          }
          return false
        }),
      )
    }

    // Apply active filters
    Object.entries(activeFilters).forEach(([filterKey, values]) => {
      if (values.length > 0) {
        const field = filterFields[filterKey]
        filtered = filtered.filter((item) => {
          const itemValue = item[field]
          if (typeof itemValue === "string") {
            return values.includes(itemValue)
          }
          if (Array.isArray(itemValue)) {
            return values.some((v) => itemValue.includes(v))
          }
          return false
        })
      }
    })

    return filtered
  }, [data, searchValue, activeFilters, searchFields, filterFields])

  const handleFilterChange = (filterKey: string, value: string, checked: boolean) => {
    setActiveFilters((prev) => {
      const current = prev[filterKey] || []
      if (checked) {
        return { ...prev, [filterKey]: [...current, value] }
      } else {
        return { ...prev, [filterKey]: current.filter((v) => v !== value) }
      }
    })
  }

  const clearFilters = () => {
    setActiveFilters({})
    setSearchValue("")
  }

  return {
    searchValue,
    setSearchValue,
    activeFilters,
    handleFilterChange,
    clearFilters,
    filteredData,
  }
}
