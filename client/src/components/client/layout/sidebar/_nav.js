export default {
  items: [
    {
      name: 'My Orders',
      url: '/client/orders',
      icon: 'fa fa-address-book-o',
      children: [
        {
          name: 'View My Orders',
          url: '/client/orders/view',
          icon: 'fa fa-list'
        },
        {
          name: 'New Order',
          url: '/client/orders/new',
          icon: 'fa fa-plus'
        }
      ]
    },
    {
      name: 'View My Balances',
      url: '/client/balances/view',
      icon: 'fa fa-list'
    }
  ]
};
