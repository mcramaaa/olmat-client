"use client";

import React from "react";

import { useState } from "react";
import { PlusCircle, User, Info, X } from "lucide-react";
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

interface Participant {
  id: number;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  photo: File | null;
  photoPreview: string | null;
  attachment: File | null;
  attachmentPreview: string | null;
}

export default function ParticipantFormV2() {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 1,
      fullName: "",
      gender: "",
      dateOfBirth: "",
      email: "",
      phoneNumber: "",
      photo: null,
      photoPreview: null,
      attachment: null,
      attachmentPreview: null,
    },
  ]);

  const [activeParticipant, setActiveParticipant] = useState<number>(1);
  const [participantToDelete, setParticipantToDelete] = useState<number | null>(
    null
  );

  const MAX_PARTICIPANTS = 11;

  const handleInputChange = (
    id: number,
    field: keyof Participant,
    value: string
  ) => {
    setParticipants(
      participants.map((participant) =>
        participant.id === id ? { ...participant, [field]: value } : participant
      )
    );
  };

  const handlePhotoChange = (id: number, file: File | null) => {
    setParticipants(
      participants.map((participant) => {
        if (participant.id === id) {
          // If there was a previous preview URL, revoke it to prevent memory leaks
          // if (participant.photoPreview) {
          //   URL.revokeObjectURL(participant.photoPreview);
          // }

          return {
            ...participant,
            photo: file,
            photoPreview: file ? URL.createObjectURL(file) : null,
          };
        }
        return participant;
      })
    );
  };

  const handleAttachmentChange = (id: number, file: File | null) => {
    setParticipants(
      participants.map((participant) => {
        if (participant.id === id) {
          return {
            ...participant,
            attachment: file,
            attachmentPreview: file ? URL.createObjectURL(file) : null,
          };
        }
        return participant;
      })
    );
  };

  const addParticipant = () => {
    if (participants.length < MAX_PARTICIPANTS) {
      const newParticipant = {
        id: participants.length + 1,
        fullName: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        phoneNumber: "",
        photo: null,
        photoPreview: null,
        attachment: null,
        attachmentPreview: null,
      };
      setParticipants([...participants, newParticipant]);
      setActiveParticipant(newParticipant.id);
    }
  };

  const removeParticipant = (id: number) => {
    if (participants.length > 1) {
      // Clean up any object URLs before removing the participant
      const participantToRemove = participants.find((p) => p.id === id);
      if (participantToRemove?.photoPreview) {
        URL.revokeObjectURL(participantToRemove.photoPreview);
      }

      const newParticipants = participants
        .filter((p) => p.id !== id)
        .map((p, index) => ({
          ...p,
          id: index + 1,
        }));
      setParticipants(newParticipants);

      // If the active participant was removed, set active to the first participant
      if (activeParticipant === id) {
        setActiveParticipant(1);
      } else if (activeParticipant > id) {
        // If the removed participant was before the active one, adjust the active ID
        setActiveParticipant(activeParticipant - 1);
      }
    }
  };

  // Clean up object URLs when component unmounts
  // React.useEffect(() => {
  //   return () => {
  //     participants.forEach((participant) => {
  //       if (participant.photoPreview) {
  //         URL.revokeObjectURL(participant.photoPreview);
  //       }
  //     });
  //   };
  // }, [participants]);

  const activeParticipantData =
    participants.find((p) => p.id === activeParticipant) || participants[0];

  const handleDeleteClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setParticipantToDelete(id);
  };

  const confirmDelete = () => {
    if (participantToDelete) {
      removeParticipant(participantToDelete);
      setParticipantToDelete(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Submitting participants:", participants);
    alert("Registration submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Pendaftaran Peserta</CardTitle>
          <CardDescription>
            Kamu dapat mendaftarkan 10 Peserta untuk mendapatkan gratis 1
            Peserta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Participants ({participants.length}/{MAX_PARTICIPANTS})
            </h2>
            {participants.length < MAX_PARTICIPANTS && (
              <Button
                type="button"
                variant="outline"
                onClick={addParticipant}
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" />
                Add Participant
              </Button>
            )}
          </div>

          {/* Participant Navigation Tabs */}
          <div className="bg-muted/30 rounded-md p-2">
            <div className="flex flex-wrap gap-3">
              {participants.map((participant) => (
                <div key={participant.id} className="relative">
                  <Button
                    type="button"
                    variant={
                      activeParticipant === participant.id
                        ? "default"
                        : "outline"
                    }
                    className={`h-10 min-w-12 px-3 ${
                      activeParticipant === participant.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-background"
                    }`}
                    onClick={() => setActiveParticipant(participant.id)}
                  >
                    {participant.id}
                  </Button>
                  {participants.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-5 w-5 p-0 absolute -top-2 -right-2 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(participant.id, e);
                      }}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">
                        Remove participant {participant.id}
                      </span>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Active Participant Form */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5" />
              <h3 className="text-lg font-medium">
                Participant {activeParticipantData.id}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`fullName-${activeParticipantData.id}`}>
                  Full Name
                </Label>
                <Input
                  id={`fullName-${activeParticipantData.id}`}
                  placeholder="Enter participant's full name"
                  value={activeParticipantData.fullName}
                  onChange={(e) =>
                    handleInputChange(
                      activeParticipantData.id,
                      "fullName",
                      e.target.value
                    )
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                  value={activeParticipantData.gender}
                  onValueChange={(value) =>
                    handleInputChange(activeParticipantData.id, "gender", value)
                  }
                  className="flex gap-4"
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="male"
                      id={`male-${activeParticipantData.id}`}
                    />
                    <Label htmlFor={`male-${activeParticipantData.id}`}>
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="female"
                      id={`female-${activeParticipantData.id}`}
                    />
                    <Label htmlFor={`female-${activeParticipantData.id}`}>
                      Female
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`dateOfBirth-${activeParticipantData.id}`}>
                    Date of Birth
                  </Label>
                  <Input
                    id={`dateOfBirth-${activeParticipantData.id}`}
                    type="date"
                    value={activeParticipantData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange(
                        activeParticipantData.id,
                        "dateOfBirth",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`email-${activeParticipantData.id}`}>
                    Email
                  </Label>
                  <Input
                    id={`email-${activeParticipantData.id}`}
                    type="email"
                    placeholder="participant@example.com"
                    value={activeParticipantData.email}
                    onChange={(e) =>
                      handleInputChange(
                        activeParticipantData.id,
                        "email",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`phoneNumber-${activeParticipantData.id}`}>
                  Phone Number
                </Label>
                <Input
                  id={`phoneNumber-${activeParticipantData.id}`}
                  placeholder="+62 8xx xxxx xxxx"
                  value={activeParticipantData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange(
                      activeParticipantData.id,
                      "phoneNumber",
                      e.target.value
                    )
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`photo-${activeParticipantData.id}`}>
                    Photo
                  </Label>
                  <FileUpload
                    id={`photo-${activeParticipantData.id}`}
                    value={activeParticipantData.photo}
                    preview={activeParticipantData.photoPreview}
                    onChange={(file) =>
                      handlePhotoChange(activeParticipantData.id, file)
                    }
                    accept="image/jpeg,image/png,image/webp"
                    maxSize={5}
                    placeholder={{
                      title: "Drag & drop or click to upload",
                      description:
                        "Upload a photo of the participant. Max size 200 Kb. Formats: JPG, PNG, WebP.",
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`attachment-${activeParticipantData.id}`}>
                    Attachment
                  </Label>
                  <FileUpload
                    id={`attachment-${activeParticipantData.id}`}
                    value={activeParticipantData.attachment}
                    preview={activeParticipantData.attachmentPreview}
                    onChange={(file) =>
                      handleAttachmentChange(activeParticipantData.id, file)
                    }
                    accept="image/jpeg,image/png,image/webp"
                    maxSize={5}
                    placeholder={{
                      title: "Drag & drop or click to upload",
                      description:
                        "Upload a attachments of the participant. Max size 200 Kb. Formats: JPG, PNG, WebP.",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <Alert className="bg-muted/50 border-muted">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <span className="font-semibold">Penting</span>: Pastikan semua
              data peserta telah benar. Kamu bisa mendaftarkan 10 peserta untuk
              mendapatkan gratis 1 peserta.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" size="lg">
            Submit Registration
          </Button>
        </CardFooter>
      </Card>
      {/* Confirmation Dialog */}
      <Dialog
        open={participantToDelete !== null}
        onOpenChange={(open) => !open && setParticipantToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove Participant {participantToDelete}?
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
            <Button type="button" variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
