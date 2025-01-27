import { useMutation } from '@tanstack/react-query';
import supabaseClient from '../supabase-client';

export async function uploadFileWithAiSource({
  file,
  aiSource,
}: {
  file: File;
  aiSource: boolean;
}) {
  const fileExtension = file.name.split('.').pop();
  const uniqueId = crypto.randomUUID();
  const timestamp = Date.now();
  const filePath = `${uniqueId}/${timestamp}_source_upload_ai_${aiSource}/${timestamp}_${file.name}`;
  console.log(filePath);
  // we web https://ylgsrkaefxdpomhmocuj.supabase.co/storage/v1/object/files/56d3b862-207f-4027-9d4b-7bb94074fb58/1737735890236_source_upload_ai_false/uh.pdf.pdf
  // mine   https://ylgsrkaefxdpomhmocuj.supabase.co/storage/v1/object/files/254548e6-946e-466e-bc9c-0657221c2594/1737736718925_source_upload_ai_false/uh.pdf.pdf
  const { error } = await supabaseClient.storage.from('files').upload(filePath, file, {
    cacheControl: 'none',
    upsert: true,
  });

  if (error) {
    throw error;
  }

  return filePath;
}
