import dynamic from 'next/dynamic';

const SellForm = dynamic(() => import('../components/sellForm.js'), {
  loading: () => <p>Loading...</p>,
});

export default function SellPage() {
  return <SellForm />;
}
