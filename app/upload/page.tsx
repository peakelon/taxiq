"use client";

import { useMemo, useState } from "react";
import { useAppState } from "@/components/providers/app-state-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { currency } from "@/lib/utils";
import type { TaxDocument } from "@/lib/types";

export default function UploadPage() {
  const { documents, uploadDocument } = useAppState();
  const [fileName, setFileName] = useState("Sample_2024_W2.pdf");
  const [docType, setDocType] = useState<TaxDocument["type"]>("W-2");

  const totals = useMemo(
    () =>
      documents.reduce(
        (acc, doc) => {
          acc.wages += doc.parsedFields.wages;
          acc.withholding += doc.parsedFields.federalWithholding;
          return acc;
        },
        { wages: 0, withholding: 0 }
      ),
    [documents]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brandBlue dark:text-brandGreen">Document Upload & Parsing</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Mock AI parser extracts fields instantly for W-2/1099 review.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upload tax document</CardTitle>
            <CardDescription>v1 MVP uses realistic static parsing logic in local state</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">File name</p>
                <Input value={fileName} onChange={(event) => setFileName(event.target.value)} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Document type</p>
                <Select value={docType} onChange={(event) => setDocType(event.target.value as TaxDocument["type"])}>
                  <option>W-2</option>
                  <option>1099-NEC</option>
                  <option>1099-INT</option>
                  <option>1098</option>
                </Select>
              </div>
            </div>
            <Button onClick={() => uploadDocument(fileName || `Uploaded_${docType}.pdf`, docType)}>
              Parse Document
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Running totals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-slate-500 dark:text-slate-400">Parsed wages</p>
            <p className="text-2xl font-semibold text-brandBlue dark:text-brandGreen">
              {currency(totals.wages)}
            </p>
            <p className="pt-2 text-sm text-slate-500 dark:text-slate-400">Federal withholding</p>
            <p className="text-xl font-semibold">{currency(totals.withholding)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Parsed documents</CardTitle>
          <CardDescription>Review extracted fields before adding to filing prep</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="grid gap-3 rounded-lg border border-slate-200 p-4 dark:border-slate-700 md:grid-cols-6"
            >
              <div className="md:col-span-2">
                <p className="font-medium">{doc.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{doc.parsedFields.employerOrPayer}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Type</p>
                <Badge variant="secondary">{doc.type}</Badge>
              </div>
              <Field label="Wages" value={currency(doc.parsedFields.wages)} />
              <Field label="Fed Withheld" value={currency(doc.parsedFields.federalWithholding)} />
              <Field label="EIN" value={doc.parsedFields.ein} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
