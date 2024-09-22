import { useMemo } from "react"
import { OrderItem } from "../types"

type OrderTotalProps = {
    order: OrderItem[]
    tip: number,
    placeOrder: () => void
}

export default function OrderTotal({order, tip, placeOrder} : OrderTotalProps) {

    const subtotalAmount = useMemo(() => order.reduce( (total, item) => total + (item.quantity * item.price), 0 ) , [order])
    const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order])
    const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, order])

  return (
    <>
        <div className="space-y-3">
            <h2 className="font-black text-2xl">Totales y Propina:</h2>
            <p>Subtotal a pagar: {''}
                <span className="font-bold">${subtotalAmount}</span>
            </p>

            <p>Propina: {''}
                <span className="font-bold">${tipAmount}</span>
            </p>

            <p>Total a pagar: {''}
                <span className="font-bold">${totalAmount}</span>
            </p>
        </div>

        <button
            className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
            disabled={totalAmount === 0}
            onClick={placeOrder}
        >
            Guardar orden
        </button>
    </>
  )
}
