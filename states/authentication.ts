
import { StateCreator } from "zustand";
import { UserSessionModel } from "@/services/types";

export interface AuthenticationState {
  // Used to store the current authenticated user's information
  user?: UserSessionModel | null | undefined;
}

// This contains all the methods that can modify the authentication state
export interface AuthenticationActions {
  // Method to set the current user
  // Takes a UserSessionModel as parameter
  setUser: (user: UserSessionModel) => void;
  
  // Method to clear the current user (logout)
  // Takes no parameters
  clearUser: () => void;
}

// Combine state and actions into a single slice interface
// This represents the complete authentication portion of your store
export interface AuthenticationSlice {
  authentication: AuthenticationState & AuthenticationActions;
}

// Create the authentication slice using Zustand's StateCreator
// Generic parameters:
// - AuthenticationSlice: The type of the complete slice
// - []: No middleware
// - []: No devtools
// - AuthenticationSlice: The type of the complete store
export const createAuthenticationSlice: StateCreator<
  AuthenticationSlice,
  [],
  [],
  AuthenticationSlice
> = (set, get) => ({
  // Define the authentication slice object
  authentication: {
    // Initial state: user is null
    user: null,
    
    // setUser action: updates the user in state
    // Spreads the existing authentication state and updates the user property
    setUser: (user) => set((state) => ({ 
      authentication: { ...state.authentication, user } 
    })),
    
    // clearUser action: sets user to null (logs out)
    // Spreads the existing authentication state and sets user to null
    clearUser: () => set((state) => ({ 
      authentication: { ...state.authentication, user: null } 
    }))
  }
});