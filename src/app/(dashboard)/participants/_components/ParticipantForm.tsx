"use client";

import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusCircle, User, Info, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import FileUpload from "@/components/ui/FileUpload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ErrMessageBox from "@/components/ui/ErrMessageBox";
import { useAuth } from "@/lib/auth";
import { useLayout } from "@/hooks/zustand/layout";
import { useRouter } from "next/navigation";
import { postParticipantAction } from "../participant.action";
import AdminSchoolSelect from "./AdminSchoolSelect";
import { convertRupiah } from "@/helper/common";

export const participantSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Nama perlu di isi"),
  gender: z.string().min(1, "Jenis Kelamin perlu di isi"),
  birth: z.string().min(1, "Tanggal lahir perlu di isi"),
  email: z.string().email("Email tidak valid"),
  phone: z
    .string()
    .min(1, "Whatsapp perlu di isi")
    .regex(/^08\d+$/, "Nomor WhatsApp harus dimulai dengan 08"),
  img: z.any().optional().nullable(),
  imgPreview: z.string().optional().nullable(),
  attachment: z.any().optional().nullable(),
  attachmentPreview: z.string().optional().nullable(),
});

const formSchema = z.object({
  participants: z.array(participantSchema),
});

type ParticipantFormValues = z.infer<typeof formSchema>;

interface IPops {
  provinceOptions: { label: string; value: string }[];
}

export default function ParticipantForm({ provinceOptions }: IPops) {
  const MAX_PARTICIPANTS = 11;
  const router = useRouter();
  const { user, setUser } = useAuth();
  const { isLoadingBlock, setIsLoadingBlock, setIsSuccess, setError } =
    useLayout();
  const [activeParticipant, setActiveParticipant] = useState<number>(0);
  const [participantToDelete, setParticipantToDelete] = useState<number | null>(
    null
  );
  const [isErrMsg, setIsErrMsg] = useState<string>();
  const [isCountSubmit, setIsCountSubmit] = useState<number>(0);

  const [fileData, setFileData] = useState<{
    [key: number]: {
      img: File | null;
      imgPreview: string | null;
      attachment: File | null;
      attachmentPreview: string | null;
    };
  }>({
    0: {
      img: null,
      imgPreview: null,
      attachment: null,
      attachmentPreview: null,
    },
  });

  const form = useForm<ParticipantFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      participants: [
        {
          id: 1,
          name: "",
          gender: "",
          birth: "",
          email: "",
          phone: "",
          img: null,
          imgPreview: null,
          attachment: null,
          attachmentPreview: null,
        },
      ],
    },
  });

  // Get the field array methods
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "participants",
  });

  /**
   * HANDLE CHAGE ETC
   */
  // Handle add participant
  const addParticipant = () => {
    if (fields.length < MAX_PARTICIPANTS) {
      const newId = fields.length + 1;
      append({
        id: newId,
        name: "",
        gender: "",
        birth: "",
        email: "",
        phone: "",
        img: null,
        imgPreview: null,
        attachment: null,
        attachmentPreview: null,
      });

      setFileData((prev) => ({
        ...prev,
        [fields.length]: {
          img: null,
          imgPreview: null,
          attachment: null,
          attachmentPreview: null,
        },
      }));

      setActiveParticipant(fields.length);
    }
  };

  // Handle select school for admin
  const handleSelectSchoolAdmin = (schId: string, price: number) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        schoolId: Number(schId),
        registerPrice: price,
      };
    });
  };

  // Handle change photo
  const handlePhotoChange = (index: number, file: File | null) => {
    const imgPreview = file ? URL.createObjectURL(file) : null;

    setFileData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        img: file,
        imgPreview,
      },
    }));

    const participant = form.getValues(`participants.${index}`);
    update(index, {
      ...participant,
      img: file,
      imgPreview,
    });
  };

  // Handle change attachment
  const handleAttachmentChange = (index: number, file: File | null) => {
    const attachmentPreview = file ? URL.createObjectURL(file) : null;

    setFileData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        attachment: file,
        attachmentPreview,
      },
    }));

    const participant = form.getValues(`participants.${index}`);
    update(index, {
      ...participant,
      attachment: file,
      attachmentPreview,
    });
  };

  // Handle delete participant
  const handleDeleteClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setParticipantToDelete(index);
  };

  // Confirm deletion participant
  const confirmDelete = () => {
    if (participantToDelete !== null && fields.length > 1) {
      const { imgPreview, attachmentPreview } = fileData[participantToDelete];
      if (imgPreview) URL.revokeObjectURL(imgPreview);
      if (attachmentPreview) URL.revokeObjectURL(attachmentPreview);

      remove(participantToDelete);

      const newFileData = { ...fileData };
      delete newFileData[participantToDelete];

      const updatedFileData: typeof fileData = {};
      Object.keys(newFileData).forEach((key, i) => {
        const numKey = Number.parseInt(key);
        if (numKey < participantToDelete) {
          updatedFileData[i] = newFileData[numKey];
        } else if (numKey > participantToDelete) {
          updatedFileData[i - 1] = newFileData[numKey];
        }
      });

      setFileData(updatedFileData);

      if (activeParticipant === participantToDelete) {
        setActiveParticipant(0);
      } else if (activeParticipant > participantToDelete) {
        setActiveParticipant(activeParticipant - 1);
      }

      setParticipantToDelete(null);
    }
  };

  // Err Detection
  const checkForErrors = useCallback((): boolean => {
    //Form Check
    const formErrors = form.formState.errors;
    if (formErrors.participants && Array.isArray(formErrors.participants)) {
      for (let i = 0; i < formErrors.participants.length; i++) {
        const participantError = formErrors.participants[i];
        if (
          participantError &&
          typeof participantError === "object" &&
          Object.keys(participantError).length > 0
        ) {
          const errorField = Object.keys(participantError)[0];
          const errorMessage =
            participantError[errorField]?.message || "Data tidak valid";
          setIsErrMsg(`Data pada peserta ${i + 1}: ${errorMessage}`);
          return true;
        }
      }
    }

    //File Check
    for (let i = 0; i < fields.length; i++) {
      if (!fileData[i].img && !fileData[i].attachment) {
        setIsErrMsg(
          `Foto dan Attachment pada peserta ${
            i + 1
          } belum dilengkapi, lengkapi terlebih dahulu untuk berpindah ke peserta yang lain`
        );
        return true;
      }
      if (!fileData[i].img) {
        setIsErrMsg(
          `Foto pada peserta ${
            i + 1
          } belum dilengkapi, lengkapi terlebih dahulu untuk berpindah ke peserta yang lain`
        );
        return true;
      }
      if (!fileData[i].attachment) {
        setIsErrMsg(
          `Attachment pada peserta ${
            i + 1
          } belum dilengkapi, lengkapi terlebih dahulu untuk berpindah ke peserta yang lain`
        );

        return true;
      }
    }
    setIsErrMsg(undefined);
    return false;
  }, [fields.length, fileData, form.formState.errors]);

  useEffect(() => {
    if (isCountSubmit !== 0) {
      checkForErrors();
    }
  }, [form.formState, fileData, fields.length, checkForErrors, isCountSubmit]);

  // Handle Submit
  async function onSubmit(data: ParticipantFormValues) {
    setIsLoadingBlock(true);
    setIsCountSubmit(isCountSubmit + 1);
    setIsErrMsg(undefined);
    if (checkForErrors()) {
      setIsLoadingBlock(false);
      return;
    }
    const completeData = data.participants.map((participant, index) => {
      delete participant.imgPreview;
      delete participant.attachmentPreview;
      return {
        ...participant,
        img: fileData[index].img,
        attachment: fileData[index].attachment,
      };
    });

    const res = await postParticipantAction(completeData, user?.schoolId || 0);
    if (res.success) {
      setIsSuccess(true, "Yay, Peserta berhasil terdaftar 🎉");
      router.push(`/transactions/${res.data.payment.invoice}`);
      setIsLoadingBlock(false);
    } else {
      const err = res.error;
      setError(true, "Yah, Peserta gagal terdaftar 😔");
      setIsLoadingBlock(false);
      console.error("err", err);
    }
  }

  return (
    <>
      {user?.type === "Admin" && (
        <AdminSchoolSelect
          provinceOptions={provinceOptions}
          selectedSchool={(schId, price) =>
            handleSelectSchoolAdmin(schId, price)
          }
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full max-w-4xl">
            <CardHeader>
              <CardTitle>
                <button
                  onClick={() => setIsLoadingBlock(false)}
                  className="hover:scale-110"
                >
                  Pendaftaran Peserta
                </button>
              </CardTitle>
              <CardDescription>
                <p>
                  Harga per peserta{" "}
                  <span className="text-black font-bold">
                    {user?.registerPrice && convertRupiah(user.registerPrice)}
                  </span>
                  . Kamu dapat mendaftarkan 10 Peserta untuk mendapatkan gratis
                  1 Peserta.
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Peserta ({fields.length}/{MAX_PARTICIPANTS})
                </h2>
                {fields.length < MAX_PARTICIPANTS && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addParticipant}
                    className="flex items-center gap-1"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Tambah Peserta
                  </Button>
                )}
              </div>

              {/* Participant Navigation Tabs */}
              <div className="p-2 rounded-md bg-muted/30">
                <div className="flex flex-wrap gap-3">
                  {fields.map((field, index) => {
                    // Cek apakah participant ini memiliki error di form - cara yang aman secara tipe
                    let hasFormError = false;
                    if (
                      form.formState.errors.participants &&
                      Array.isArray(form.formState.errors.participants) &&
                      form.formState.errors.participants[index] &&
                      typeof form.formState.errors.participants[index] ===
                        "object"
                    ) {
                      hasFormError =
                        Object.keys(
                          form.formState.errors.participants[index] || {}
                        ).length > 0;
                    }

                    // Cek apakah participant ini memiliki foto dan attachment
                    const hasMissingFiles =
                      !fileData[index]?.img || !fileData[index]?.attachment;

                    // Gabungkan semua error
                    const hasError = hasFormError || hasMissingFiles;

                    return (
                      <div key={field.id} className="relative">
                        <Button
                          type="button"
                          variant={
                            activeParticipant === index ? "default" : "outline"
                          }
                          className={`h-10 min-w-12 px-3 ${
                            activeParticipant === index
                              ? "bg-primary text-primary-foreground"
                              : hasError
                              ? "bg-background border-red-500"
                              : "bg-background"
                          }`}
                          onClick={() => setActiveParticipant(index)}
                        >
                          {index + 1}
                          {hasError && (
                            <span className="absolute w-3 h-3 bg-red-500 rounded-full -top-1 -right-1"></span>
                          )}
                        </Button>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute w-5 h-5 p-0 rounded-full -top-2 -right-2"
                            onClick={(e) => handleDeleteClick(index, e)}
                          >
                            <X className="w-3 h-3" />
                            <span className="sr-only">
                              Hapus peserta {index + 1}
                            </span>
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Participant Form */}
              {fields[activeParticipant] && (
                <div key={activeParticipant}>
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-5 h-5" />
                    <h3 className="text-lg font-medium">
                      {fields[activeParticipant].name
                        ? fields[activeParticipant].name
                        : `Peserta ${activeParticipant + 1}`}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name={`participants.${activeParticipant}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Lengkap</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukkan nama pelengkap peserta"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`participants.${activeParticipant}.gender`}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Jenis Kelamin</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="L"
                                  id={`male-${activeParticipant}`}
                                />

                                <Label htmlFor={`male-${activeParticipant}`}>
                                  Laki-laki
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="P"
                                  id={`female-${activeParticipant}`}
                                />
                                <Label htmlFor={`female-${activeParticipant}`}>
                                  Perempuan
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`participants.${activeParticipant}.birth`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tanggal Lahir</FormLabel>
                            <FormControl>
                              <div>
                                <Input
                                  className="  flex justify-between"
                                  type="date"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`participants.${activeParticipant}.email`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="peserta@gmail.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name={`participants.${activeParticipant}.phone`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp</FormLabel>
                          <FormControl>
                            <Input placeholder="08xx xxxx xxxx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`photo-${activeParticipant}`}>
                          Foto
                        </Label>
                        <FileUpload
                          id={`photo-${activeParticipant}`}
                          value={fileData[activeParticipant]?.img || null}
                          preview={
                            fileData[activeParticipant]?.imgPreview || null
                          }
                          onChange={(file) =>
                            handlePhotoChange(activeParticipant, file)
                          }
                          accept="image/jpeg,image/png,image/webp"
                          maxSize={200}
                          placeholder={{
                            title: "Drag & drop or click to upload",
                            description:
                              "Upload Foto Peserta. Ukuran maksimal 200 Kb. Formats: JPG, PNG, WebP.",
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`attachment-${activeParticipant}`}>
                          Kartu Pelajar / File Pendukung
                        </Label>
                        <FileUpload
                          id={`attachment-${activeParticipant}`}
                          value={
                            fileData[activeParticipant]?.attachment || null
                          }
                          preview={
                            fileData[activeParticipant]?.attachmentPreview ||
                            null
                          }
                          onChange={(file) =>
                            handleAttachmentChange(activeParticipant, file)
                          }
                          accept="image/jpeg,image/png,image/webp"
                          maxSize={200}
                          placeholder={{
                            title: "Drag & drop or click to upload",
                            description:
                              "Upload Attachments Peserta. Ukuran maksimal 200 Kb. Formats: JPG, PNG, WebP.",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {isErrMsg && <ErrMessageBox message={isErrMsg} />}

              <Alert className="bg-muted/50 border-muted">
                <Info className="w-4 h-4" />
                <AlertDescription>
                  <span className="font-semibold">Penting</span>: Pastikan semua
                  data peserta telah benar. Kamu bisa mendaftarkan 10 peserta
                  untuk mendapatkan gratis 1 peserta.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                disabled={isLoadingBlock}
                onClick={() => setIsCountSubmit(isCountSubmit + 1)}
              >
                {isLoadingBlock ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  "Kirim Pendaftaran"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>

        {/* Confirmation Dialog */}
        <Dialog
          open={participantToDelete !== null}
          onOpenChange={(open) => !open && setParticipantToDelete(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove Participant{" "}
                {participantToDelete !== null ? participantToDelete + 1 : ""}?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setParticipantToDelete(null)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Form>
    </>
  );
}
