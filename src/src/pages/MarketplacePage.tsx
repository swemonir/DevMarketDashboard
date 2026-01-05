import React, { useState } from 'react';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { MetricCard } from '../components/ui/MetricCard';
import { Avatar } from '../components/ui/Avatar';
import { Toggle } from '../components/ui/Toggle';
import { SellerControlDrawer } from '../components/drawers/SellerControlDrawer';
import { MOCK_MARKETPLACE_LISTINGS } from '../utils/mockData';
import { MarketplaceListing } from '../types';
import { Search, Filter, ShoppingBag, DollarSign, Users, Ban, Eye } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
export function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const {
    addToast
  } = useToast();
  const handleToggleVisibility = (id: string) => {
    addToast('Listing visibility updated', 'success');
  };
  const columns = [{
    header: 'Project',
    cell: (item: MarketplaceListing) => <div>
          <div className="font-medium text-gray-200">{item.project.title}</div>
          <div className="text-xs text-gray-500">{item.project.category}</div>
        </div>
  }, {
    header: 'Seller',
    cell: (item: MarketplaceListing) => <div className="flex items-center gap-2 cursor-pointer hover:opacity-80" onClick={e => {
      e.stopPropagation();
      setSelectedSeller(item.seller);
    }}>
          <Avatar src={item.seller.avatar} size="sm" fallback={item.seller.name} />
          <span className="text-sm">{item.seller.name}</span>
        </div>
  }, {
    header: 'Price',
    cell: (item: MarketplaceListing) => <span className="font-medium">${item.price}</span>
  }, {
    header: 'Platform',
    cell: (item: MarketplaceListing) => <Badge variant="outline">{item.platform}</Badge>
  }, {
    header: 'Verified',
    cell: (item: MarketplaceListing) => item.isVerified ? <Badge variant="success">Verified</Badge> : <Badge variant="default">Unverified</Badge>
  }, {
    header: 'Visibility',
    cell: (item: MarketplaceListing) => <Toggle checked={item.isVisible} onChange={() => handleToggleVisibility(item.id)} />
  }, {
    header: 'Actions',
    cell: (item: MarketplaceListing) => <div className="flex gap-2">
          <Button size="sm" variant="ghost" title="View Details">
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" title="Suspend">
            <Ban className="w-4 h-4" />
          </Button>
        </div>
  }];
  const filteredListings = MOCK_MARKETPLACE_LISTINGS.filter(l => l.project.title.toLowerCase().includes(searchTerm.toLowerCase()) || l.seller.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">
            Marketplace Management
          </h1>
          <p className="text-gray-400 mt-1">
            Manage listings, sellers, and transactions.
          </p>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Search listings..." className="w-64" leftIcon={<Search className="w-4 h-4" />} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <Button variant="secondary" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Total Listings" value="1,203" icon={<ShoppingBag className="w-5 h-5" />} trend="up" change={12} />
        <MetricCard title="Active Listings" value="1,150" icon={<Eye className="w-5 h-5" />} trend="up" change={8} />
        <MetricCard title="Verified Sellers" value="845" icon={<Users className="w-5 h-5" />} trend="up" change={5} />
        <MetricCard title="Total Revenue" value="$45.2k" icon={<DollarSign className="w-5 h-5" />} trend="up" change={15} />
      </div>

      <Table data={filteredListings} columns={columns} />

      <SellerControlDrawer isOpen={!!selectedSeller} onClose={() => setSelectedSeller(null)} seller={selectedSeller} listings={MOCK_MARKETPLACE_LISTINGS} />
    </div>;
}