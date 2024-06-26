const allocateRooms = (groupData, hostelData) => {
  const allocation = [];

  // Filter out invalid entries from groupData and hostelData
  const validGroups = groupData.filter(
    (group) => group['Group ID'] && group.Members && group.Gender
  );

  const validHostels = hostelData.filter(
    (room) => room['Hostel Name'] && room['Room Number'] && room.Capacity && room.Gender
  );

  // Sort hostelData by capacity descending for optimal allocation
  validHostels.sort((a, b) => b.Capacity - a.Capacity);

  validGroups.forEach((group) => {
    const { 'Group ID': GroupID, Members, Gender } = group;
    let allocated = false;

    for (let i = 0; i < validHostels.length; i++) {
      const room = validHostels[i];

      // Check if room meets gender and capacity requirements
      if (room.Gender === Gender && room.Capacity >= Members) {
        allocation.push({
          GroupID,
          HostelName: room['Hostel Name'],
          RoomNumber: room['Room Number'],
          MembersAllocated: Members,
        });
        room.Capacity -= Members; // Reduce room capacity after allocation
        allocated = true;
        break;
      }
    }

    // If group cannot be allocated, mark as not allocated with a reason
    if (!allocated) {
      allocation.push({
        GroupID,
        HostelName: 'Not Allocated',
        RoomNumber: 'Not Allocated',
        MembersAllocated: Members,
        Reason: `No available room with capacity ${Members} and gender ${Gender}`,
      });
    }
  });

  return allocation;
};

module.exports = allocateRooms;
