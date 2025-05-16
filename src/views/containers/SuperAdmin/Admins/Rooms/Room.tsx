import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Card, message, Space, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Room {
  id: string;
  name: string;
  roomNumber: string;
  location: string;
  floorLevel: string;
  size: string;
  seats: number;
  status: 'Available' | 'Occupied' | 'Maintenance';
  facilities: string[];
  imageUrl?: string;
}

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {

        const mockRooms: Room[] = [
          { 
            id: '1', 
            name: 'Executive Boardroom', 
            roomNumber: 'CR-102A', 
            location: 'North Tower', 
            floorLevel: '12',
            size: 'Medium', 
            seats: 12, 
            status: 'Available', 
            facilities: ['Projector', 'Video Conferencing', 'Whiteboard'],
            imageUrl: 'executive_boardroom.png'
          },
          { 
            id: '2', 
            name: 'Meeting Room B', 
            roomNumber: 'CR-103B', 
            location: 'South Tower', 
            floorLevel: '5',
            size: 'Small', 
            seats: 6, 
            status: 'Occupied', 
            facilities: ['Whiteboard']
          },
          { 
            id: '3', 
            name: 'Conference Hall', 
            roomNumber: 'CR-201', 
            location: 'Main Building', 
            floorLevel: '2',
            size: 'Large', 
            seats: 30, 
            status: 'Available', 
            facilities: ['Projector', 'Video Conferencing', 'Whiteboard', 'Audio System']
          },
        ];
        
        setRooms(mockRooms);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
        message.error('Failed to load rooms data');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleAddRoom = () => {
    navigate('/rooms/add');
  };

  const handleEditRoom = (id: string) => {
    navigate(`/rooms/edit/${id}`);
  };

  const handleDeleteRoom = (id: string) => {
    navigate(`/rooms/delete/${id}`);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/rooms/view/${id}`);
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Room Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Room) => (
        <a onClick={() => handleViewDetails(record.id)}>{text}</a>
      ),
    },
    {
      title: 'Room Number',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Seats',
      dataIndex: 'seats',
      key: 'seats',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'green';
        if (status === 'Occupied') color = 'blue';
        if (status === 'Maintenance') color = 'orange';
        return (
          <span style={{ color }}>{status}</span>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Room) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEditRoom(record.id)}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            onClick={() => handleDeleteRoom(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="rooms-container">
      <div className="rooms-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={2}>Rooms Management</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAddRoom}
        >
          Add Room
        </Button>
      </div>
      
      <Card>
        <Table 
          columns={columns} 
          dataSource={rooms} 
          rowKey="id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Rooms;