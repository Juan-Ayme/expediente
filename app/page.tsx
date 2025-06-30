import ExpedienteHeader from '@/components/ExpedienteHeader'
import ResumenExpediente from '@/components/ResumenExpediente'
import DocumentosSection from '@/components/DocumentosSection'

export default function Home() {
  return (
    <div className="pt-16 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-16">
        <ExpedienteHeader />
        <ResumenExpediente />
        <DocumentosSection />
      </div>
    </div>
  );
}