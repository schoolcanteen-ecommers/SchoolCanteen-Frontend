"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface StudentProfileEditContextValue {
  isEditing: boolean;
  startEditing: () => void;
  stopEditing: () => void;
}

const StudentProfileEditContext =
  createContext<StudentProfileEditContextValue | null>(
    null,
  );

interface StudentProfileEditProviderProps {
  children: ReactNode;
}

export function StudentProfileEditProvider({
  children,
}: StudentProfileEditProviderProps) {
  const [isEditing, setIsEditing] =
    useState(false);

  const value = useMemo(
    () => ({
      isEditing,
      startEditing: () =>
        setIsEditing(true),
      stopEditing: () =>
        setIsEditing(false),
    }),
    [isEditing],
  );

  return (
    <StudentProfileEditContext.Provider
      value={value}
    >
      {children}
    </StudentProfileEditContext.Provider>
  );
}

export function useStudentProfileEdit() {
  const context = useContext(
    StudentProfileEditContext,
  );

  if (!context) {
    throw new Error(
      "useStudentProfileEdit must be used within StudentProfileEditProvider",
    );
  }

  return context;
}
