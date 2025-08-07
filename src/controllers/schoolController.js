class SchoolController {
  constructor(schoolModel) {
    this.schoolModel = schoolModel;
  }

  async addSchool(req, res) {
    const { name, address, latitude, longitude } = req.body;

    // Input validation
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (
      typeof name !== "string" ||
      typeof address !== "string" ||
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return res.status(400).json({ message: "Invalid data types." });
    }

    try {
      const newSchool = await this.schoolModel.addSchool(
        name,
        address,
        latitude,
        longitude
      );
      return res
        .status(201)
        .json({ message: "School added successfully", school: newSchool });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error adding school", error: error.message });
    }
  }

  async listSchools(req, res) {
    let { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required." });
    }

    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude must be numbers." });
    }

    try {
      const schools = await this.schoolModel.listSchools();
      const sortedSchools = this.sortSchoolsByDistance(schools, {
        latitude,
        longitude,
      });
      return res.status(200).json(sortedSchools);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving schools", error: error.message });
    }
  }

  sortSchoolsByDistance(schools, userLocation) {
    const { latitude, longitude } = userLocation;
    return schools
      .map((school) => {
        const distance = this.calculateDistance(
          school.latitude,
          school.longitude,
          latitude,
          longitude
        );
        return { ...school, distance };
      })
      .sort((a, b) => a.distance - b.distance);
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
}

module.exports = SchoolController;
