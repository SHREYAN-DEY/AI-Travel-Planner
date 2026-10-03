export const registerUser = async (userData) => {
  console.log("Frontend register data:", userData)

  return {
    success: true,
    message: "Registration successful",
  }
}

export const loginUser = async (loginData) => {
  console.log("Frontend login data:", loginData)

  return {
    success: true,
    message: "Login successful",
  }
}

export const getCurrentUser = async () => {
  return {
    success: true,
    user: null,
  }
}

export const logoutUser = async () => {
  console.log("Frontend logout")

  return {
    success: true,
    message: "Logged out successfully",
  }
}