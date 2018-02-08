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
    }
  ]
};
