class UsersService {

  constructor(req) {
    this.req = req
  }

  

  fetchAllSales(start, end, clientsIds, dateType) {
    const { Order } = this.req.models
    return Order.aggregate([
      {
        $match:
        {
          createdAt: { $gt: start.toDate(), $lt: end.toDate() },
          client: { "$in": clientsIds }
        }
      },
      {
        $group:
          {
            _id: this.getDateType(dateType),
            totalPrice: { $sum: "$totalPrice" },
            totalPriceAfterDiscount: { $sum: "$totalPriceAfterDiscount" },
          }
      },
      {
        $project: {
          date: "$_id",
          client: "$_id.client",
          totalPrice: 1,
          totalPriceAfterDiscount: 1,
          _id: 0
        }
      },
      { $sort: { "date.year":1, "date.month":1, "date.day":1, "date.hour": 1 } },
    ])
  }

  getDateType(type) {
    let groupObj = {
      client: "$client",
      hour: { $hour: "$createdAt" },
      day : { $dayOfMonth: "$createdAt" },
      month: { $month: "$createdAt" },
      year: { $year: "$createdAt" }
    }
    switch (type) {
      case 'day':
        return groupObj
        break
      case 'month':
        delete groupObj.hour
        return groupObj
        break
      case 'year':
        delete groupObj.hour
        delete groupObj.day
        return groupObj
        break
      default:
        return {
          client: "$client"
        }
    }
  }
}

module.exports =  UsersService