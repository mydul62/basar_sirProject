"use client"

import { Navigation } from "@/src/components/navigation"
import { ScrollToTop } from "@/src/components/ui/scroll-to-top"
import { PageHeader } from "@/components/ui/page-header"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"
import { useSearchFilter } from "@/hooks/use-search-filter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Building, Calendar, Network as NetworkIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { GetAllNetworks } from "@/src/services/networks"
import { Network } from "@/src/lib/demo-data"

export default function NetworksPage() {
  const [networks, setNetworks] = useState<Network[]>([])

  useEffect(() => {
    const fetchNetworks = async () => {
      try {
        const res = await GetAllNetworks()
        setNetworks(res?.data)
      } catch (error) {
        console.error("Failed to fetch networks:", error)
      }
    }

    fetchNetworks()
  }, [])

  const {
    searchValue,
    setSearchValue,
    filteredData: filteredNetworks,
  } = useSearchFilter({
    data: networks,
    searchFields: ["role"], // শুধুমাত্র role/title দিয়ে search হবে
    filterFields: {}, // কোনো filter নেই
  })

  // Map type → label + icon
  const typeLabels: Record<Network["type"], string> = {
    editorial: "Editorial",
    membership: "Membership",
    advisory: "Advisory",
    mentorship: "Mentorship",
  }

  const typeIcons: Record<Network["type"], JSX.Element> = {
    editorial: <Users className="w-5 h-5 text-primary" />,
    membership: <Users className="w-5 h-5 text-primary" />,
    advisory: <NetworkIcon className="w-5 h-5 text-primary" />,
    mentorship: <Building className="w-5 h-5 text-primary" />,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <PageHeader
        title="Professional Networks"
        description="Active participation in professional organizations, editorial boards, and academic communities"
      />

      <main className="ml-0 lg:ml-64">
        <div className="container mx-auto px-4 py-8">
          {/* শুধু Search bar */}
          <div className="mb-8">
            <SearchFilterBar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filters={[]} // কোনো filter নেই
              activeFilters={{}}
              onFilterChange={() => {}}
              onClearFilters={() => setSearchValue("")}
              placeholder="Search networks by role..."
            />
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredNetworks.length} of {networks.length} networks
            </p>
          </div>

          {/* Networks grouped by type */}
          {Object.entries(
            filteredNetworks.reduce(
              (acc, network) => {
                if (!acc[network.type]) acc[network.type] = []
                acc[network.type].push(network)
                return acc
              },
              {} as Record<Network["type"], Network[]>,
            ),
          ).map(([type, typeNetworks]) => (
            <div key={type} className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  {typeIcons[type as Network["type"]]}
                </div>
                {typeLabels[type as Network["type"]]} Roles
                <Badge variant="secondary" className="ml-2">
                  {typeNetworks.length}
                </Badge>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {typeNetworks.map((network) => (
                  <Card key={network._id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-foreground mb-2">
                            {network.role}
                          </CardTitle>
                          <p className="text-primary font-medium mb-1">{network.organization}</p>
                          {network.description && (
                            <p className="text-sm text-muted-foreground">{network.description}</p>
                          )}
                        </div>
                        <Badge variant="outline" className="shrink-0 capitalize">
                          {network.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {network.startYear
                            ? `${network.startYear} - ${network.endYear || "Present"}`
                            : "Current"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* No results message */}
          {filteredNetworks.length === 0 && (
            <div className="text-center py-12">
              <NetworkIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No networks found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms.
              </p>
              <button onClick={() => setSearchValue("")} className="text-primary hover:text-primary/80">
                Clear search
              </button>
            </div>
          )}
        </div>
      </main>
      <ScrollToTop />
    </div>
  )
}
