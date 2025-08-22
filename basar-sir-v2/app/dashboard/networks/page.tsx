"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Users } from "lucide-react"
import { networks as initialNetworks } from "@/src/lib/demo-data"
import { NetworkModals } from "@/src/components/dashboard/network-modals"

export default function NetworksPage() {
  const [networks, setNetworks] = useState(initialNetworks)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null)

  const handleAdd = (networkData: any) => {
    const newNetwork = {
      ...networkData,
      id: Date.now().toString(),
    }
    setNetworks([newNetwork, ...networks])
    setIsAddModalOpen(false)
  }

  const handleEdit = (networkData: any) => {
    setNetworks(
      networks.map((network) =>
        network.id === selectedNetwork.id ? { ...networkData, id: selectedNetwork.id } : network,
      ),
    )
    setIsEditModalOpen(false)
    setSelectedNetwork(null)
  }

  const handleDelete = () => {
    setNetworks(networks.filter((network) => network.id !== selectedNetwork.id))
    setIsDeleteModalOpen(false)
    setSelectedNetwork(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Professional Networks</h1>
          <p className="text-muted-foreground">Manage your professional affiliations and memberships</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Network
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Professional Affiliations</CardTitle>
          <CardDescription>Your memberships, editorial roles, and professional connections</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {networks.map((network) => (
                <TableRow key={network.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      {network.role}
                    </div>
                  </TableCell>
                  <TableCell>{network.organization}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{network.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Active</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedNetwork(network)
                          setIsEditModalOpen(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedNetwork(network)
                          setIsDeleteModalOpen(true)
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NetworkModals
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedNetwork={selectedNetwork}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
