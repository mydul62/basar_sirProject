"use client"

import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SearchFilterBarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  filters: Array<{
    key: string
    label: string
    options: Array<{ value: string; label: string; count?: number }>
  }>
  activeFilters: Record<string, string[]>
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void
  onClearFilters: () => void
  placeholder?: string
}

export function SearchFilterBar({
  searchValue,
  onSearchChange,
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  placeholder = "Search...",
}: SearchFilterBarProps) {
  const hasActiveFilters = Object.values(activeFilters).some((values) => values.length > 0)
  const totalActiveFilters = Object.values(activeFilters).reduce((sum, values) => sum + values.length, 0)

  return (
    <div className="space-y-4 ">
      {/* Search Bar */}
      <div className="relative border-2 rounded-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground " />
        <Input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <DropdownMenu key={filter.key}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 bg-transparent">
                <Filter className="h-3 w-3 mr-2" />
                {filter.label}
                {activeFilters[filter.key]?.length > 0 && (
                  <Badge variant="secondary" className="ml-2 h-4 px-1 text-xs">
                    {activeFilters[filter.key].length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {filter.options.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={activeFilters[filter.key]?.includes(option.value) || false}
                  onCheckedChange={(checked) => onFilterChange(filter.key, option.value, checked)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{option.label}</span>
                    {option.count !== undefined && (
                      <span className="text-xs text-muted-foreground">{option.count}</span>
                    )}
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-8 px-2 text-xs">
            <X className="h-3 w-3 mr-1" />
            Clear ({totalActiveFilters})
          </Button>
        )}
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1">
          {Object.entries(activeFilters).map(([filterKey, values]) =>
            values.map((value) => {
              const filter = filters.find((f) => f.key === filterKey)
              const option = filter?.options.find((o) => o.value === value)
              return (
                <Badge key={`${filterKey}-${value}`} variant="secondary" className="text-xs">
                  {option?.label || value}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-transparent"
                    onClick={() => onFilterChange(filterKey, value, false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )
            }),
          )}
        </div>
      )}
    </div>
  )
}
