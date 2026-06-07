import React from "react"


const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      data: {
        full_name: fullName,
        phone_number: phoneNumber,
      },
    },
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log("User created:", data);
};

const OwnerSignUpPage = () => {
  return (
    <div>
        Owner Signup Page
    </div>
  )
}

export default OwnerSignUpPage
