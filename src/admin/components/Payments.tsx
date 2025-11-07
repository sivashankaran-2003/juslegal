import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useState } from "react"
import getTemplatepayments from "src/template-payments/queries/getTemplatepayments"
import { Pagination } from "@mantine/core"

const ITEMS_PER_PAGE = 4

export default function Payments({ currentUser }) {
  const [activePage, setPage] = useState(1)
  const [{ templatepayments, count }] = usePaginatedQuery(getTemplatepayments, {
    orderBy: { id: "asc" },
    where: {
      userId: currentUser.role !== "ADMIN" ? currentUser?.id : undefined,
    },
    select: {
      user: {
        select: {
          name: true,
        },
      },
      template: {
        select: {
          id: true,
          name: true,
        },
      },
      amount: true,
      currency: true,
      createdAt: true,
      razorpayOrderId: true,
      razorpayPaymentId: true,
    },
    skip: ITEMS_PER_PAGE * (activePage - 1),
    take: ITEMS_PER_PAGE,
  })
  // console.log(templatepayments)
  return (
    <>
      {templatepayments.map((templatepayment) => {
        const amount = Number(templatepayment?.amount) / 100
        //@ts-ignore
        const date = new Date(templatepayment?.createdAt).toLocaleDateString()
        return (
          <Link
            // @ts-ignore
            key={templatepayment?.template?.id}
            // @ts-ignore
            href={`/admin/render/${templatepayment?.template?.id}`}
          >
            <a>
              <div className="message-header">
                {/* @ts-ignore */}
                {templatepayment?.user?.email}
                {/* @ts-ignore */}
                <div className="name">{templatepayment?.template?.name}</div>
              </div>
              <p className="message-line">
                {templatepayment.currency}. {amount.toString()} -{" "}
                {templatepayment.razorpayPaymentId}
              </p>
              <p className="message-line">{templatepayment.razorpayOrderId}</p>
              <p className="message-line time">{date}</p>
            </a>
          </Link>
        )
      })}
      {Math.ceil(count / ITEMS_PER_PAGE) !== 0 && (
        <div className="flex justify-center items-center md:p-2">
          <Pagination
            page={activePage}
            onChange={setPage}
            total={Math.ceil(count / ITEMS_PER_PAGE)}
            radius="xl"
            withEdges
          />
        </div>
      )}
    </>
  )
}
