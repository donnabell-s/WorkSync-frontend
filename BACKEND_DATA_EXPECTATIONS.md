# Backend Data Expectations for Dashboard

This document outlines the exact data structures the frontend expects to receive from the backend for all dashboard components.

---

## 🎯 Dashboard KPIs (Summary Cards)

### Endpoint
```
GET /api/Dashboard/GetOptimizedDashboard
```

### Expected Response Structure
```json
{
  "success": true,
  "data": {
    "summary": {
      "availableRooms": 10,
      "roomsUnderMaintenance": 2,
      "todaysBookings": 15,
      "ongoingBookings": 3,
      "bookingsCompletedToday": 12,
      "utilizationRateToday": 65.5
    },
    "trends": [...],
    "peakUsage": [...],
    "lastComputedAt": "2025-11-20T14:30:00Z",
    "fromCache": true
  },
  "message": "Data retrieved from cache"
}
```

### TypeScript Interface
```typescript
interface DashboardSummary {
  availableRooms: number;          // Total rooms available for booking
  roomsUnderMaintenance: number;   // Total rooms currently under maintenance
  todaysBookings: number;          // Total bookings scheduled for today
  ongoingBookings: number;         // Bookings currently active (in progress)
  bookingsCompletedToday: number;  // Bookings that have ended today
  utilizationRateToday: number;    // Percentage (0-100) of room capacity used today
}
```

### Field Descriptions

| Field | Type | Description | Example | Validation |
|-------|------|-------------|---------|------------|
| `availableRooms` | number | Count of rooms with status "Available" and not under maintenance | 10 | >= 0 |
| `roomsUnderMaintenance` | number | Count of rooms with status "Maintenance" or unavailable | 2 | >= 0 |
| `todaysBookings` | number | Count of all bookings where booking date = today | 15 | >= 0 |
| `ongoingBookings` | number | Count of bookings where current time is between startTime and endTime | 3 | >= 0 |
| `bookingsCompletedToday` | number | Count of bookings where endTime < current time and date = today | 12 | >= 0 |
| `utilizationRateToday` | number | (Total booked hours / Total available room hours) × 100 for today | 65.5 | 0-100 |

### UI Display Mapping

```tsx
// Card 1: Available Rooms
<AdminDashboardCard 
  label='Available Rooms' 
  icon={<MdMeetingRoom />} 
  value={summary.availableRooms} 
/>

// Card 2: Rooms Under Maintenance
<AdminDashboardCard 
  label='Rooms Under Maintenance' 
  icon={<PiWrenchFill />} 
  value={summary.roomsUnderMaintenance} 
/>

// Card 3-5: Multiple values card
<AdminDashboardCard
  variant='multiple'
  label={["Today's Bookings", "Ongoing Bookings", "Completed Today"]}
  value={[
    summary.todaysBookings, 
    summary.ongoingBookings, 
    summary.bookingsCompletedToday
  ]} 
/>

// Card 6: Utilization Rate
<AdminDashboardCard 
  label='Utilization Rate (Today)' 
  value={`${summary.utilizationRateToday.toFixed(1)}%`}  // Formatted as "65.5%"
/>
```

---

## 📊 Bookings Per Room (Trend Chart)

### Endpoint
```
GET /api/Dashboard/GetOptimizedTrend?startDate=2025-11-13&endDate=2025-11-19
```

### Expected Response Structure
```json
{
  "success": true,
  "data": {
    "trends": [
      {
        "date": "2025-11-13",
        "bookingsCount": 12,
        "utilizationPercentage": 45.5
      },
      {
        "date": "2025-11-14",
        "bookingsCount": 18,
        "utilizationPercentage": 67.2
      },
      {
        "date": "2025-11-15",
        "bookingsCount": 15,
        "utilizationPercentage": 55.8
      },
      {
        "date": "2025-11-16",
        "bookingsCount": 10,
        "utilizationPercentage": 38.3
      },
      {
        "date": "2025-11-17",
        "bookingsCount": 8,
        "utilizationPercentage": 30.1
      },
      {
        "date": "2025-11-18",
        "bookingsCount": 22,
        "utilizationPercentage": 82.5
      },
      {
        "date": "2025-11-19",
        "bookingsCount": 20,
        "utilizationPercentage": 75.0
      }
    ],
    "lastComputedAt": "2025-11-20T14:30:00Z",
    "fromCache": true
  },
  "message": "Trend data retrieved from cache"
}
```

### TypeScript Interface
```typescript
interface BookingTrendItem {
  date: string;                    // Format: "yyyy-MM-dd" (ISO 8601 date only)
  bookingsCount: number;           // Total number of bookings on this date
  utilizationPercentage: number;   // Percentage (0-100) of capacity used
}

interface TrendData {
  trends: BookingTrendItem[];
  lastComputedAt: string;          // ISO 8601 timestamp
  fromCache: boolean;
}
```

### Field Descriptions

| Field | Type | Description | Example | Validation |
|-------|------|-------------|---------|------------|
| `date` | string | Date in ISO format (yyyy-MM-dd) | "2025-11-13" | Valid date string |
| `bookingsCount` | number | Total bookings scheduled for this date | 12 | >= 0 |
| `utilizationPercentage` | number | (Booked hours / Available hours) × 100 for this date | 45.5 | 0-100 |

### Date Range Calculation
```typescript
// Frontend calculates week range from selected date:
const start = new Date(selectedWeek);
start.setDate(start.getDate() - start.getDay()); // Sunday
const end = new Date(start);
end.setDate(start.getDate() + 6); // Saturday

// Formats to: startDate=2025-11-13, endDate=2025-11-19
```

### Expected Data Points
- **7 data points** for a week view (Sunday to Saturday)
- Each date should have exactly one entry
- Missing dates should return `{ date: "yyyy-MM-dd", bookingsCount: 0, utilizationPercentage: 0 }`

### Chart Display
```tsx
// Frontend transforms for display:
const chartData = trends.map(item => ({
  day: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }), // "Sun", "Mon", etc.
  bookings: item.bookingsCount,
  utilization: Math.round(item.utilizationPercentage * 100) / 100
}));

// Displayed as:
// - Bar chart (Y1 axis): bookingsCount
// - Line chart (Y2 axis): utilizationPercentage
// - X axis: Day abbreviation (Sun, Mon, Tue, etc.)
```

---

## 🔥 Peak Usage Times (Heatmap)

### Endpoint
```
GET /api/Dashboard/GetOptimizedPeakUsage?date=2025-11-20
```

### Expected Response Structure
```json
{
  "success": true,
  "data": {
    "peakUsage": [
      {
        "roomName": "Conference Room A",
        "hour": 8,
        "occupancyRate": 0.0
      },
      {
        "roomName": "Conference Room A",
        "hour": 9,
        "occupancyRate": 50.0
      },
      {
        "roomName": "Conference Room A",
        "hour": 10,
        "occupancyRate": 75.5
      },
      {
        "roomName": "Conference Room A",
        "hour": 11,
        "occupancyRate": 100.0
      },
      {
        "roomName": "Conference Room A",
        "hour": 12,
        "occupancyRate": 85.0
      },
      {
        "roomName": "Conference Room A",
        "hour": 13,
        "occupancyRate": 60.0
      },
      {
        "roomName": "Conference Room A",
        "hour": 14,
        "occupancyRate": 90.5
      },
      {
        "roomName": "Conference Room A",
        "hour": 15,
        "occupancyRate": 70.0
      },
      {
        "roomName": "Conference Room A",
        "hour": 16,
        "occupancyRate": 55.0
      },
      {
        "roomName": "Conference Room A",
        "hour": 17,
        "occupancyRate": 30.0
      },
      {
        "roomName": "Conference Room A",
        "hour": 18,
        "occupancyRate": 0.0
      },
      {
        "roomName": "Conference Room B",
        "hour": 8,
        "occupancyRate": 25.0
      }
      // ... more entries for each room and hour
    ],
    "lastComputedAt": "2025-11-20T14:30:00Z",
    "fromCache": true
  },
  "message": "Peak usage data retrieved from cache"
}
```

### TypeScript Interface
```typescript
interface PeakUsageItem {
  roomName: string;       // Full name of the room
  hour: number;           // Hour of day (0-23)
  occupancyRate: number;  // Percentage (0-100) of time occupied during this hour
}

interface PeakUsageData {
  peakUsage: PeakUsageItem[];
  lastComputedAt: string;
  fromCache: boolean;
}
```

### Field Descriptions

| Field | Type | Description | Example | Validation |
|-------|------|-------------|---------|------------|
| `roomName` | string | Name of the meeting room | "Conference Room A" | Non-empty string |
| `hour` | number | Hour of day (24-hour format) | 14 | 0-23 |
| `occupancyRate` | number | Percentage of time the room was occupied during this hour | 75.5 | 0-100 |

### Data Calculation Logic

**Backend should calculate occupancy rate per hour as:**
```
occupancyRate = (minutes_occupied_in_hour / 60) × 100

Example:
- Hour 14:00-15:00
- Booking 1: 14:00-14:30 (30 minutes)
- Booking 2: 14:45-15:00 (15 minutes)
- Total occupied: 45 minutes
- Occupancy rate: (45/60) × 100 = 75.0%
```

### Expected Data Structure

**For each room:**
- Return data for operating hours only (typically 8:00-18:00 = hours 8-18)
- **11 data points per room** (hours 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18)
- If a room has no bookings for an hour, return `occupancyRate: 0.0`

**Example for 3 rooms:**
```
Conference Room A: 11 entries (hours 8-18)
Conference Room B: 11 entries (hours 8-18)
Meeting Room 1: 11 entries (hours 8-18)
Total: 33 entries
```

### Frontend Display Logic

```typescript
// Frontend groups by room for heatmap display
const roomsMap = new Map<string, PeakUsageItem[]>();
peakUsage.forEach(item => {
  if (!roomsMap.has(item.roomName)) {
    roomsMap.set(item.roomName, []);
  }
  roomsMap.get(item.roomName)!.push(item);
});

// Heatmap colors based on occupancy rate:
const getColor = (rate: number): string => {
  if (rate === 0) return 'hsl(0, 0%, 95%)';      // Light gray - empty
  if (rate < 25) return 'hsl(120, 70%, 80%)';   // Light green - low
  if (rate < 50) return 'hsl(120, 70%, 60%)';   // Green - moderate
  if (rate < 75) return 'hsl(45, 90%, 60%)';    // Yellow - high
  return 'hsl(0, 80%, 60%)';                     // Red - very high
};
```

### Pagination

Frontend displays **10 rooms per page**:
- If you have 25 rooms, expect 3 pages
- All room data should be sent in one response
- Frontend handles pagination client-side

---

## 🔒 Complete Optimized Response (All Data)

### Single Endpoint for Full Dashboard
```
GET /api/Dashboard/GetOptimizedDashboard?date=2025-11-20
```

### Complete Response Structure
```json
{
  "success": true,
  "data": {
    "summary": {
      "availableRooms": 10,
      "roomsUnderMaintenance": 2,
      "todaysBookings": 15,
      "ongoingBookings": 3,
      "bookingsCompletedToday": 12,
      "utilizationRateToday": 65.5
    },
    "trends": [
      {
        "date": "2025-10-21",
        "bookingsCount": 20,
        "utilizationPercentage": 75.0
      }
      // ... 29 more entries (last 30 days)
    ],
    "peakUsage": [
      {
        "roomName": "Conference Room A",
        "hour": 8,
        "occupancyRate": 50.0
      }
      // ... all rooms × 11 hours
    ],
    "lastComputedAt": "2025-11-20T14:30:00Z",
    "fromCache": true
  },
  "message": "Data retrieved from cache"
}
```

### Notes
- **`trends`**: Returns last 30 days of data (30 entries)
- **`peakUsage`**: Returns data for the specified date (or today if not specified)
- **`lastComputedAt`**: When the metrics were computed/cached
- **`fromCache`**: `true` = served from Redis cache, `false` = computed fresh

---

## 📋 Data Validation Rules

### Summary Data
```typescript
// All values must be non-negative integers (except utilizationRateToday)
availableRooms >= 0
roomsUnderMaintenance >= 0
todaysBookings >= 0
ongoingBookings >= 0
bookingsCompletedToday >= 0
utilizationRateToday >= 0 && utilizationRateToday <= 100
```

### Trend Data
```typescript
// Date must be in ISO format
date.match(/^\d{4}-\d{2}-\d{2}$/) === true

// Counts must be non-negative
bookingsCount >= 0
utilizationPercentage >= 0 && utilizationPercentage <= 100
```

### Peak Usage Data
```typescript
// Room name must not be empty
roomName.length > 0

// Hour must be valid 24-hour format
hour >= 0 && hour <= 23

// Occupancy rate must be percentage
occupancyRate >= 0 && occupancyRate <= 100
```

---

## ⚠️ Error Handling

### If Backend Returns Error
```json
{
  "success": false,
  "data": null,
  "message": "Database connection failed"
}
```

### Frontend Behavior
- Displays error state in UI
- Shows error message to user
- Logs error to console
- Does not crash the application

---

## 🕒 Timestamp Format

All timestamps must be in **ISO 8601 format**:

```
Format: "yyyy-MM-ddTHH:mm:ssZ"
Example: "2025-11-20T14:30:00Z"
```

Frontend will format for display:
```typescript
new Date(lastComputedAt).toLocaleString()
// Output: "11/20/2025, 2:30:00 PM"
```

---

## 🎯 Business Logic Expectations

### Available Rooms
- Count rooms where:
  - Status = "Available" OR Status = "Active"
  - IsUnderMaintenance = false
  - Room is not deleted

### Rooms Under Maintenance
- Count rooms where:
  - IsUnderMaintenance = true OR Status = "Maintenance"

### Today's Bookings
- Count bookings where:
  - BookingDate = Today's date
  - Status != "Cancelled" AND Status != "Declined"

### Ongoing Bookings
- Count bookings where:
  - BookingDate = Today's date
  - CurrentTime >= StartTime AND CurrentTime < EndTime
  - Status = "Approved" OR Status = "Confirmed"

### Bookings Completed Today
- Count bookings where:
  - BookingDate = Today's date
  - CurrentTime >= EndTime
  - Status = "Approved" OR Status = "Confirmed"

### Utilization Rate Today
```
Formula:
utilizationRateToday = (totalBookedMinutes / totalAvailableMinutes) × 100

Where:
- totalBookedMinutes = Sum of all booking durations today (approved/confirmed only)
- totalAvailableMinutes = Number of available rooms × operating hours × 60

Example:
- 10 rooms available
- Operating hours: 8:00-18:00 (10 hours)
- Total available: 10 × 10 × 60 = 6000 minutes
- Total booked: 3930 minutes
- Utilization: (3930 / 6000) × 100 = 65.5%
```

---

## 📊 Sample Complete Dataset

### Scenario: Company with 12 rooms

**Summary:**
```json
{
  "availableRooms": 10,
  "roomsUnderMaintenance": 2,
  "todaysBookings": 15,
  "ongoingBookings": 3,
  "bookingsCompletedToday": 12,
  "utilizationRateToday": 65.5
}
```

**Trends (7 days):**
```json
[
  { "date": "2025-11-13", "bookingsCount": 12, "utilizationPercentage": 45.5 },
  { "date": "2025-11-14", "bookingsCount": 18, "utilizationPercentage": 67.2 },
  { "date": "2025-11-15", "bookingsCount": 15, "utilizationPercentage": 55.8 },
  { "date": "2025-11-16", "bookingsCount": 10, "utilizationPercentage": 38.3 },
  { "date": "2025-11-17", "bookingsCount": 8, "utilizationPercentage": 30.1 },
  { "date": "2025-11-18", "bookingsCount": 22, "utilizationPercentage": 82.5 },
  { "date": "2025-11-19", "bookingsCount": 20, "utilizationPercentage": 75.0 }
]
```

**Peak Usage (10 rooms × 11 hours = 110 entries):**
```json
[
  { "roomName": "Conference Room A", "hour": 8, "occupancyRate": 0.0 },
  { "roomName": "Conference Room A", "hour": 9, "occupancyRate": 50.0 },
  { "roomName": "Conference Room A", "hour": 10, "occupancyRate": 75.5 },
  // ... 107 more entries
]
```

---

## ✅ Testing Checklist for Backend

- [ ] Summary endpoint returns all 6 KPI values
- [ ] All numeric values are non-negative
- [ ] Utilization rate is between 0-100
- [ ] Trend endpoint returns data for requested date range
- [ ] Trend dates are in yyyy-MM-dd format
- [ ] Peak usage endpoint returns data for all rooms
- [ ] Peak usage hours are between 0-23
- [ ] Peak usage occupancy rates are between 0-100
- [ ] Response includes `lastComputedAt` timestamp
- [ ] Response includes `fromCache` boolean
- [ ] Error responses return proper error messages
- [ ] Data is cached in Redis with 5-minute TTL
- [ ] Cache invalidation works on booking updates

---

**Document Version**: 1.0  
**Last Updated**: November 20, 2025  
**Frontend Version**: Compatible with WorkSync v1.0
