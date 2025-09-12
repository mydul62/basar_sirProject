"use client"

import { ScrollToTop } from "@/src/components/ui/scroll-to-top"
import { PageHeader } from "@/components/ui/page-header"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"
import { useSearchFilter } from "@/hooks/use-search-filter"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Calendar, ExternalLink, Shield } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { GetAllCertification } from "@/src/services/certification"
import { Certificate } from "@/src/lib/demo-data"

export default function CertificatesPage() {
 const [certificates, setCertificate] = useState<Certificate[]>([])

  useEffect(() => {
    const fetchcerticate= async () => {
      try {
        const res = await GetAllCertification()
        setCertificate(res?.data) 
    
      } catch (error) {
        console.error("Failed to fetch certicates:", error)
      }
    }

    fetchcerticate()
  }, [])
  const {
    searchValue,
    setSearchValue,
    activeFilters,
    handleFilterChange,
    clearFilters,
    filteredData: filteredCertificates,
  } = useSearchFilter({
    data: certificates,
    searchFields: ["title", "issuer", "description", "skills"],
    filterFields: {
      issuer: "issuer",
      skills: "skills",
    },
  })

  const filterOptions = [
    {
      key: "issuer",
      label: "Issuer",
      options: Array.from(new Set(certificates.map((c) => c.issuer)))
        .map((issuer) => ({
          value: issuer,
          label: issuer,
          count: certificates.filter((c) => c.issuer === issuer).length,
        }))
        .sort((a, b) => b.count - a.count),
    },
    {
      key: "skills",
      label: "Skills",
      options: Array.from(new Set(certificates.flatMap((c) => c.skills)))
        .map((skill) => ({
          value: skill,
          label: skill,
          count: certificates.filter((c) => c.skills.includes(skill)).length,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10), // Show top 10 skills
    },
    {
      key: "status",
      label: "Status",
      options: [
        {
          value: "valid",
          label: "Valid",
          count: certificates.filter((c) => new Date(c.expiryDate) > new Date()).length,
        },
        {
          value: "expired",
          label: "Expired",
          count: certificates.filter((c) => new Date(c.expiryDate) <= new Date()).length,
        },
      ],
    },
  ]

  // Add status to filtered data
  const certificatesWithStatus = filteredCertificates.map((cert) => ({
    ...cert,
    status: new Date(cert.expiryDate) > new Date() ? "valid" : "expired",
  }))

  return (
    <div className="min-h-screen container mx-auto px-4  bg-background">

      <PageHeader
        title="Professional Certifications"
        description="Industry-recognized certifications demonstrating expertise in various technologies and platforms"
      />

      <main className="">
        <div className="py-8">
          <div className="mb-8 ">
            <SearchFilterBar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filters={filterOptions}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              placeholder="Search certificates by title, issuer, or skills..."
              
            />
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {certificatesWithStatus.length} of {certificates.length} certificates
            </p>
          </div>

          {/* Certificates Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {certificatesWithStatus.map((cert) => (
              <Card key={cert._id} className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={cert.image || "/placeholder.svg"}
                        alt={`${cert.title} certification badge`}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                        {cert.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground font-medium">{cert.issuer}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {cert.issueDate} - {cert.expiryDate}
                        </span>
                      </div>
                    </div>
                    <Badge variant={cert.status === "valid" ? "default" : "destructive"} className="shrink-0">
                      <Shield className="w-3 h-3 mr-1" />
                      {cert.status === "valid" ? "Valid" : "Expired"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">ID: {cert.credentialId}</span>
                    </div>
                    {cert.verificationUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(cert.verificationUrl, "_blank")}
                        className="text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Verify
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No results message */}
          {certificatesWithStatus.length === 0 && (
            <div className="text-center py-12">
              <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No certificates found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          )}

          {/* Certificate Stats */}
          {certificatesWithStatus.length > 0 && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">{certificatesWithStatus.length}</div>
                  <p className="text-muted-foreground">Total Certificates</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {certificatesWithStatus.filter((c) => c.status === "valid").length}
                  </div>
                  <p className="text-muted-foreground">Valid</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {new Set(certificatesWithStatus.map((c) => c.issuer)).size}
                  </div>
                  <p className="text-muted-foreground">Issuers</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {new Set(certificatesWithStatus.flatMap((c) => c.skills)).size}
                  </div>
                  <p className="text-muted-foreground">Skills Covered</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <ScrollToTop />
    </div>
  )
}
