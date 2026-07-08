type AccountValidationResponse = {
  canCreateAccount: boolean;
  error?: string;
};

export async function validateAccount(
  email: string,
  phoneNumber: string
): Promise<AccountValidationResponse> {
  let response: Response;

  try {
    response = await fetch("/api/account/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        phoneNumber,
      }),
    });
  } catch {
    throw new Error(
      "An error occurred while validating your account. Please try again."
    );
  }

  let data: AccountValidationResponse;
    try {
      data = await response.json();
    } catch {
      throw new Error(
        "An error occurred while validating your account. Please try again."
      );
    }
  
    if (!response.ok) {
      throw new Error(
        data.error ??
          "An error occurred while validating your account. Please try again."
      );
    }
  
    return data;
}