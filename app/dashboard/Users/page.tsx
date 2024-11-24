'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Card,
  CardBody,
  Button,
  Spinner,
  Chip
} from "@nextui-org/react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

const UsersListPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users')
        setUsers(response.data)
        setError(null)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError('The users list could not be found. Please try again later.')
          } else {
            setError('An error occurred while fetching the users. Please try again.')
          }
        } else {
          setError('An unexpected error occurred. Please try again.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardBody className="text-red-600 bg-red-50">
            {error}
          </CardBody>
        </Card>
      </div>
    )
  }

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'danger'
      case 'moderator':
        return 'warning'
      case 'user':
        return 'primary'
      default:
        return 'default'
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users List</h1>
        <Link href="/dashboard/users/new">
          <Button color="primary">
            Add New User
          </Button>
        </Link>
      </div>

      {users.length === 0 ? (
        <Card>
          <CardBody>
            <p className="text-gray-500 text-center">No users found.</p>
          </CardBody>
        </Card>
      ) : (
        <Table aria-label="Users table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    color={getRoleColor(user.role)}
                    variant="flat"
                    size="sm"
                  >
                    {user.role}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/users/edit/${user.id}`}>
                      <Button
                        size="sm"
                        variant="flat"
                        color="primary"
                      >
                        Edit
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default UsersListPage