import React from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Table } from '../ui/Table';
import { User, MarketplaceListing } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { Shield, Ban, CheckCircle } from 'lucide-react';
interface SellerControlDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  seller: User | null;
  listings: MarketplaceListing[];
}
export function SellerControlDrawer({
  isOpen,
  onClose,
  seller,
  listings
}: SellerControlDrawerProps) {
  const {
    addToast
  } = useToast();
  if (!seller) return null;
  const sellerListings = listings.filter(l => l.seller.id === seller.id);
  const handleVerify = () => {
    addToast(seller.isVerified ? 'Seller verification revoked' : 'Seller verified successfully', 'success');
  };
  const handleBlock = () => {
    addToast('Seller blocked from marketplace', 'error');
  };
  return <Drawer isOpen={isOpen} onClose={onClose} title="Seller Control" size="lg">
      <div className="space-y-8">
        {/* Seller Profile */}
        <div className="flex items-start justify-between p-6 bg-gray-900 rounded-xl border border-gray-800">
          <div className="flex items-center gap-4">
            <Avatar src={seller.avatar} fallback={seller.name} size="xl" />
            <div>
              <h3 className="text-xl font-bold text-gray-100 flex items-center gap-2">
                {seller.name}
                {seller.isVerified && <CheckCircle className="w-5 h-5 text-blue-500" />}
              </h3>
              <p className="text-gray-400">{seller.email}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant={seller.status === 'ACTIVE' ? 'success' : 'danger'}>
                  {seller.status}
                </Badge>
                <Badge variant="default">
                  {sellerListings.length} Listings
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant={seller.isVerified ? 'secondary' : 'primary'} size="sm" onClick={handleVerify} leftIcon={<Shield className="w-4 h-4" />}>
              {seller.isVerified ? 'Revoke Verification' : 'Verify Seller'}
            </Button>
            <Button variant="danger" size="sm" onClick={handleBlock} leftIcon={<Ban className="w-4 h-4" />}>
              Block Seller
            </Button>
          </div>
        </div>

        {/* Listings Table */}
        <div>
          <h4 className="text-lg font-semibold text-gray-100 mb-4">
            Active Listings
          </h4>
          <Table data={sellerListings} columns={[{
          header: 'Project',
          cell: l => l.project.title
        }, {
          header: 'Price',
          cell: l => `$${l.price}`
        }, {
          header: 'Sales',
          cell: l => l.sales
        }, {
          header: 'Status',
          cell: l => <Badge variant={l.isVisible ? 'success' : 'default'}>
                    {l.isVisible ? 'Visible' : 'Hidden'}
                  </Badge>
        }]} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
            <p className="text-sm text-gray-400">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-100 mt-1">$1,234.00</p>
          </div>
          <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
            <p className="text-sm text-gray-400">Commission Paid</p>
            <p className="text-2xl font-bold text-gray-100 mt-1">$123.40</p>
          </div>
        </div>
      </div>
    </Drawer>;
}