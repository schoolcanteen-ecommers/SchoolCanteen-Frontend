"use client";

import {
<<<<<<< HEAD
=======
  LockKeyhole,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
>>>>>>> source/main
  useState,
  type FormEvent,
} from "react";

<<<<<<< HEAD
=======
import {
  updateStudentProfile,
} from "@/lib/api/student-profile-client";

>>>>>>> source/main
interface StudentProfileEditFormProps {
  name: string;
  nis: string | null;
  className: string | null;
  phone: string | null;
  onCancel: () => void;
}

interface FormValues {
  name: string;
<<<<<<< HEAD
  nis: string;
  className: string;
  phone: string;
}

interface FormErrors {
  name?: string;
}

interface ProfileFieldProps {
=======
  phone: string;
}

interface EditableFieldProps {
>>>>>>> source/main
  id: keyof FormValues;
  label: string;
  value: string;
  type?: "text" | "tel";
  autoComplete?: string;
<<<<<<< HEAD
  placeholder: string;
  error?: string;
  onChange: (
    field: keyof FormValues,
    value: string,
  ) => void;
  onBlur?: () => void;
}

function ProfileField({
=======
  inputMode?:
    | "text"
    | "tel";
  placeholder: string;
  helperText?: string;
  error?: string;
  onChange: (
    value: string,
  ) => void;
}

function EditableField({
>>>>>>> source/main
  id,
  label,
  value,
  type = "text",
  autoComplete,
<<<<<<< HEAD
  placeholder,
  error,
  onChange,
  onBlur,
}: ProfileFieldProps) {
=======
  inputMode,
  placeholder,
  helperText,
  error,
  onChange,
}: EditableFieldProps) {
  const descriptionId =
    error
      ? `student-profile-${id}-error`
      : helperText
        ? `student-profile-${id}-helper`
        : undefined;

>>>>>>> source/main
  return (
    <div>
      <label
        htmlFor={`student-profile-${id}`}
<<<<<<< HEAD
        className="mb-2 block text-sm font-semibold text-navy-steel"
=======
        className="mb-2 block text-[13px] font-semibold text-navy-steel"
>>>>>>> source/main
      >
        {label}
      </label>

      <input
        id={`student-profile-${id}`}
        name={id}
        type={type}
        value={value}
<<<<<<< HEAD
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
=======
        autoComplete={
          autoComplete
        }
        inputMode={
          inputMode
        }
        placeholder={
          placeholder
        }
        aria-invalid={
          Boolean(error)
        }
        aria-describedby={
          descriptionId
        }
        onChange={
          (event) =>
            onChange(
              event.target.value,
            )
        }
        className={`min-h-12 w-full rounded-xl border bg-white px-4 text-[15px] text-navy-steel outline-none transition-[border-color,box-shadow] placeholder:text-[#929BA2] focus-visible:border-navy-steel focus-visible:ring-2 focus-visible:ring-navy-steel/15 ${
          error
            ? "border-red-500"
            : "border-[#CDD7DD] hover:border-[#AAB6BD]"
>>>>>>> source/main
        }`}
      />

      {error ? (
        <p
          id={`student-profile-${id}-error`}
<<<<<<< HEAD
          className="mt-2 text-xs font-medium text-[#BA1A1A]"
        >
          {error}
        </p>
=======
          className="mt-2 text-xs font-medium leading-4 text-red-600"
        >
          {error}
        </p>
      ) : helperText ? (
        <p
          id={`student-profile-${id}-helper`}
          className="mt-2 text-[11px] leading-4 text-[#74818A]"
        >
          {helperText}
        </p>
>>>>>>> source/main
      ) : null}
    </div>
  );
}

<<<<<<< HEAD
=======
function LockedField({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div>
      <p className="mb-2 text-[13px] font-semibold text-navy-steel">
        {label}
      </p>

      <div className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-[#E0E6EA] bg-[#F5F7F8] px-4">
        <span className="truncate text-sm font-medium text-[#5F6D76]">
          {value ||
            "Belum tersedia"}
        </span>

        <LockKeyhole
          aria-hidden="true"
          className="size-4 shrink-0 text-[#929BA2]"
        />
      </div>
    </div>
  );
}

>>>>>>> source/main
export function StudentProfileEditForm({
  name,
  nis,
  className,
  phone,
  onCancel,
}: StudentProfileEditFormProps) {
<<<<<<< HEAD
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
=======
  const router =
    useRouter();

  const [
    values,
    setValues,
  ] =
    useState<FormValues>({
      name,
      phone:
        phone ?? "",
    });

  const [
    nameError,
    setNameError,
  ] =
    useState<string | null>(
      null,
    );

  const [
    submitError,
    setSubmitError,
  ] =
    useState<string | null>(
      null,
    );

  const [
    isSaving,
    setIsSaving,
  ] =
    useState(false);

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    const normalizedName =
      values.name.trim();

    if (!normalizedName) {
      setNameError(
        "Nama lengkap wajib diisi.",
      );

      return;
    }

    setNameError(null);
    setSubmitError(null);
    setIsSaving(true);

    try {
      await updateStudentProfile({
        name:
          normalizedName,

        phone:
          values.phone.trim() ||
          null,
      });

      router.refresh();
      onCancel();
    } catch {
      setSubmitError(
        "Profil gagal disimpan. Periksa kembali data lalu coba lagi.",
      );

      setIsSaving(false);
    }
>>>>>>> source/main
  }

  return (
    <form
<<<<<<< HEAD
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
=======
      onSubmit={
        handleSubmit
      }
    >
      <div className="rounded-2xl bg-[#F7F9FA] p-4 sm:p-5">
        <h3 className="text-[15px] font-bold text-navy-steel">
          Data yang bisa diubah
        </h3>

        <p className="mt-1 text-xs leading-5 text-[#68757E]">
          Gunakan data yang aktif agar akun mudah dikenali.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <EditableField
            id="name"
            label="Nama Lengkap"
            value={
              values.name
            }
            autoComplete="name"
            inputMode="text"
            placeholder="Masukkan nama lengkap"
            error={
              nameError ??
              undefined
            }
            onChange={
              (value) => {
                setValues(
                  (current) => ({
                    ...current,
                    name: value,
                  }),
                );

                setNameError(
                  null,
                );
              }
            }
          />

          <EditableField
            id="phone"
            label="No. Telepon"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={
              values.phone
            }
            placeholder="Contoh: 081234567890"
            helperText="Opsional. Gunakan nomor yang masih aktif."
            onChange={
              (value) =>
                setValues(
                  (current) => ({
                    ...current,
                    phone:
                      value,
                  }),
                )
            }
          />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#E4E9EC] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#F1F4F6]">
            <LockKeyhole className="size-[17px] text-[#68757E]" />
          </div>

          <div>
            <h3 className="text-[15px] font-bold text-navy-steel">
              Data sekolah
            </h3>

            <p className="mt-1 text-xs leading-5 text-[#68757E]">
              NIS dan kelas mengikuti data resmi sekolah dan tidak dapat diubah dari aplikasi.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <LockedField
            label="NIS"
            value={nis}
          />

          <LockedField
            label="Kelas"
            value={
              className
            }
          />
        </div>
      </div>

      {submitError ? (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-5 text-red-700"
        >
          {submitError}
        </div>
      ) : null}

      <div className="mt-6 grid gap-3 border-t border-[#E5EAED] pt-5 sm:flex sm:justify-end">
        <button
          type="button"
          disabled={
            isSaving
          }
          onClick={
            onCancel
          }
          className="min-h-12 rounded-xl border border-[#CDD7DD] bg-white px-6 text-sm font-semibold text-navy-steel transition-colors hover:bg-[#F5F7F8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-steel focus-visible:ring-offset-2 disabled:opacity-50 sm:order-1"
>>>>>>> source/main
        >
          Batal
        </button>

        <button
          type="submit"
<<<<<<< HEAD
          className="h-12 rounded-xl bg-navy-steel px-6 text-sm font-semibold text-white transition-colors hover:bg-navy-steel/90"
        >
          Simpan Perubahan
=======
          disabled={
            isSaving
          }
          className="min-h-12 rounded-xl bg-navy-steel px-7 text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-steel focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 sm:order-2"
        >
          {isSaving
            ? "Menyimpan..."
            : "Simpan Perubahan"}
>>>>>>> source/main
        </button>
      </div>
    </form>
  );
}
