# Digital Hospitality Allocation

## Overview

Digital Hospitality Allocation is a web application designed to automate the allocation of student groups to hostels based on gender and capacity requirements.

## Features

- Upload CSV files containing group and hostel information.
- Automatically allocate groups to suitable hostels based on predefined rules.
- Display allocation results with detailed information.

## How It Works

The application uses a matching algorithm to assign groups to hostels:
- Groups are matched to hostels based on gender (Boys/Girls) and available capacity.
- If a suitable hostel cannot be found for a group, it is marked as "Not Allocated" with a reason provided.

## Installation and Setup

### Prerequisites

- Node.js and npm installed on your machine.

### Running the Application

1. Clone the repository:
```
git clone https://github.com/responsive-we/hostel_allocation.git
cd hostel_allocation
```

2. Install dependencies:

Of Backend
```
cd backend
npm install
```
Of Frontend
```
cd frontend
npm install
```

3. Start the application:
Runnning this application requires two terminal sessions, one for backend and another for frontend.

For frontend
```
cd frontend
npm run dev
```
For backend (open in another terminal window)
```
cd backend
node server.js
```


4. Open your browser and navigate to `http://localhost:5173`.

## Usage

1. **Upload CSV Files:**
- Upload the `group_information.csv` and `hostel_information.csv` files containing group and hostel data, respectively.

2. **Allocate Hostels:**
- Click on the "Submit" button to trigger the allocation process.

3. **View Results:**
- Once allocation is complete, view the results in the Allocation Results section of the application.

### CSV File Structure

- **Group Information CSV:**
- Columns: Group ID, Members, Gender (Boys/Girls)
- Example:
 ```
 Group ID,Members,Gender
 101,3,Boys
 102,4,Girls
 ...
 ```

- **Hostel Information CSV:**
- Columns: Hostel Name, Room Number, Capacity, Gender (Boys/Girls)
- Example:
 ```
 Hostel Name,Room Number,Capacity,Gender
 Boys Hostel A,101,3,Boys
 Girls Hostel B,201,4,Girls
 ...
 ```

### Sample Data

- Sample CSV data (`group_information.csv` and `hostel_information.csv`) is available in `sample` folder in the repository for testing purposes.

---

