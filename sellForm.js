import { useState } from 'react';
import { useAuth } from '../utils/auth';
import { useRouter } from 'next/router';

export default function SellForm() {
  const [form, setForm] = useState({ title: '', description: '', price: '', image: '' });
  const auth = useAuth();
  const router = useRouter();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newItem = { 
      id: Date.now(), 
      ...form, 
      username: auth?.user?.name, 
      department: auth?.user?.department 
    };
    auth.addItem(newItem);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="sell-form">
    <div className="form-group">
      <input name="title" placeholder="Title" onChange={handleChange} required />
    </div>
  
    <div className="form-group">
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
    </div>
  
    <div className="form-group">
      <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
    </div>
  
    <div className="form-group">
      <label htmlFor="image-upload" className="file-upload-label">
        Choose File
      </label>
      <input type="file" id="image-upload" name="image" onChange={handleChange} />
    </div>
  
    <button type="submit">Submit</button>
  </form>
  
  );
}
