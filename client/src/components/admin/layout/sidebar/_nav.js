export default {
  items: [
    {
      name: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'fa fa-tachometer'
    },
    {
      name: 'Users',
      url: '/admin/users',
      icon: 'fa fa-address-book-o',
      children: [
        {
          name: 'View Users',
          url: '/admin/users/view',
          icon: 'fa fa-list'
        },
        {
          name: 'New User',
          url: '/admin/users/new',
          icon: 'fa fa-plus'
        }
      ]
    },
    {
      name: 'Clients',
      url: '/admin/clients',
      icon: 'fa fa-address-book-o',
      children: [
        {
          name: 'View Clients',
          url: '/admin/clients/view',
          icon: 'fa fa-list'
        },
        {
          name: 'New Clinet',
          url: '/admin/clients/new',
          icon: 'fa fa-plus'
        }
      ]
    },
    {
      name: 'Plans',
      url: '/admin/plans',
      icon: 'fa fa-address-book-o',
      children: [
        {
          name: 'View Plans',
          url: '/admin/plans/view',
          icon: 'fa fa-list'
        },
        {
          name: 'New Plan',
          url: '/admin/plans/new',
          icon: 'fa fa-plus'
        }
      ]
    },
    {
      name: 'Balances',
      url: '/admin/balances',
      icon: 'fa fa-address-book-o',
      children: [
        {
          name: 'View Balances',
          url: '/admin/balances/view',
          icon: 'fa fa-list'
        },
        {
          name: 'New Balance',
          url: '/admin/balances/new',
          icon: 'fa fa-plus'
        }
      ]
    },
    {
      name: 'Orders',
      url: '/admin/orders',
      icon: 'fa fa-address-book-o',
      children: [
        {
          name: 'View Orders',
          url: '/admin/orders/view',
          icon: 'fa fa-list'
        },
        {
          name: 'New Order',
          url: '/admin/orders/new',
          icon: 'fa fa-plus'
        }
      ]
    }
  ]
};
