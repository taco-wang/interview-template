/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Rabbit, { MessageContract } from '@ioc:Adonis/Addons/Rabbit'
import Order from 'App/Models/Order'
import Product from 'App/Models/Product'

async function listen() {
  await Rabbit.assertQueue('order:finished')

  await Rabbit.consumeFrom('order:finished', async (message: MessageContract<Order>) => {
    const order = JSON.parse(message.content)
    console.log(order)
    // 更新 订单支付状态
    await Order.query().where('orderNo', order.order_no).update({ status: 2 })
    // 更新商品库存
    await Product.query().where('id', order?.product_id).decrement('stock', 1)
    await message.ack()
  })
}

listen()
