// pages/bookings/[id].js
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import BookingSummary from '../../../components/BookingSummary.js'

export default function BookingDetails() {
  const router = useRouter()
  const { id } = router.query
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return

    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/${id}`)
        if (!response.ok) throw new Error('Booking not found')
        const data = await response.json()
        setBooking(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!booking) return <div>Booking not found</div>

  return (
    <>
      <Head>
        <title>Booking Details</title>
        <meta name="description" content="View booking details" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <BookingSummary booking={booking} />
      </main>
    </>
  )
}