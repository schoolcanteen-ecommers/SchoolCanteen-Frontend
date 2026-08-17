"use client";

import {
  useState,
  type FormEvent,
} from "react";

interface StudentProfileEditFormProps {
  name: string;
  nis: string | null;
  className: string | null;
  phone: string | null;
  onCancel: () => void;
}

interface FormValues {
  name: string;
  nis: string;
  className: string;
  phone: string;
}

interface FormErrors {
  name?: string;
}

interface ProfileFieldProps {
  id: keyof FormValues;
  label: string;
  value: string;
  type?: "text" | "tel";
  autoComplete?: string;
  placeholder: string;
  error?: string;
  onChange: (
    field: keyof FormValues,
    value: string,
  ) => void;
  onBlur?: () => void;
}

function ProfileField({
  id,
  label,
  value,
  type = "text",
  autoComplete,
  placeholder,
  error,
  onChange,
  onBlur,
}: ProfileFieldProps) {
  return (
    <div>
      <label
        htmlFor={`student-profile-${id}`}
        className="mb-2 block text-sm font-semibold text-navy-steel"
      >
        {label}
      </label>

      <input
        id={`student-profile-${id}`}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `student-profile-${id}-error`
            : undefined
        }
        onBlur={onBlur}
        onChange={(event) =>
          onChange(id, event.target.value)
        }
        className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-navy-steel outline-none transition-colors placeholder:text-[#8B9299] focus:border-2 focus:border-navy-steel ${
          error
            ? "border-[#BA1A1A]"
            : "border-[#C4C6CC] hover:border-[#9AA0A6]"
        }`}
      />

      {error ? (
        <p
          id={`student-profile-${id}-error`}
          className="mt-2 text-xs font-medium text-[#BA1A1A]"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function StudentProfileEditForm({
  name,
  nis,
  className,
  phone,
  onCancel,
}: StudentProfileEditFormProps) {
  const [values, setValues] =
    useState<FormValues>({
      name,
      nis: nis ?? "",
      className: className ?? "",
      phone: phone ?? "",
    });

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [submitNotice, setSubmitNotice] =
    useState<string | null>(null);

  function validateName(value: string) {
    if (!value.trim()) {
      return "Nama lengkap wajib diisi.";
    }

    return undefined;
  }

  function handleChange(
    field: keyof FormValues,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    if (field === "name") {
      setErrors((current) => ({
        ...current,
        name: undefined,
      }));
    }

    setSubmitNotice(null);
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const nameError = validateName(
      values.name,
    );

    if (nameError) {
      setErrors({
        name: nameError,
      });
      setSubmitNotice(null);
      return;
    }

    setErrors({});
    setSubmitNotice(
      "Form sudah valid. Penyimpanan permanen belum diaktifkan karena endpoint update profil belum tersedia.",
    );
  }

  function handleCancel() {
    setValues({
      name,
      nis: nis ?? "",
      className: className ?? "",
      phone: phone ?? "",
    });
    setErrors({});
    setSubmitNotice(null);
    onCancel();
  }

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <ProfileField
          id="name"
          label="Nama Lengkap"
          value={values.name}
          autoComplete="name"
          placeholder="Masukkan nama lengkap"
          error={errors.name}
          onChange={handleChange}
          onBlur={() => {
            const nameError = validateName(
              values.name,
            );

            setErrors((current) => ({
              ...current,
              name: nameError,
            }));
          }}
        />

        <ProfileField
          id="nis"
          label="NIS"
          value={values.nis}
          placeholder="Masukkan NIS"
          onChange={handleChange}
        />

        <ProfileField
          id="className"
          label="Kelas"
          value={values.className}
          placeholder="Masukkan kelas"
          onChange={handleChange}
        />

        <ProfileField
          id="phone"
          label="No. Telepon"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          placeholder="Masukkan nomor telepon"
          onChange={handleChange}
        />
      </div>

      {submitNotice ? (
        <div className="rounded-xl border border-[#D1E4FF] bg-[#E6F4FF]/70 px-4 py-3 text-sm leading-6 text-[#3A4859]">
          {submitNotice}
        </div>
      ) : null}

      <div className="flex flex-col-reverse gap-3 border-t border-[#E0E3E5] pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleCancel}
          className="h-12 rounded-xl border border-[#C4C6CC] px-6 text-sm font-semibold text-navy-steel transition-colors hover:border-navy-steel hover:bg-[#F7F9FB]"
        >
          Batal
        </button>

        <button
          type="submit"
          className="h-12 rounded-xl bg-navy-steel px-6 text-sm font-semibold text-white transition-colors hover:bg-navy-steel/90"
        >
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
}
