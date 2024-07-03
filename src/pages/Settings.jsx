import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

const Settings = () => {
  const setAvatar = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    model: 'dall-e-3',
    prompt: '',
    size: '1024x1024',
    response_format: 'b64_json',
  });

  const [base64, setBase64] = useState('');

  const src = `data:image/png;base64,${base64}`;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formState.prompt) throw new Error('Please type in a prompt');
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_OPENAI_PROXY}/api/v1/images/generations`, {
        method: 'POST',
        headers: {
          provider: 'open-ai',
          mode: 'production',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await res.json();
      console.log(data);
      setBase64(data[0].b64_json);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen'>
      <div className='h-[75%] p-5 bg-base-200 rounded-lg shadow-md overflow-y-scroll'>
        <img src={src} alt='' />
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex items-center gap-2'>
          <textarea
            name='prompt'
            value={formState.prompt}
            rows='2'
            onChange={handleChange}
            placeholder='Generate an avatar...'
            className='w-full textarea textarea-bordered'
            disabled={loading}
          ></textarea>
          <button type='submit' className='btn btn-primary btn-circle' disabled={loading}>
            {loading ? (
              <span className='loading loading-spinner'></span>
            ) : (
              <span role='img' aria-label='sparkles'>
                ✨
              </span>
            )}
          </button>
        </div>
      </form>
      {base64 && (
        <button
          className='btn btn-primary'
          onClick={() => {
            localStorage.setItem('avatar', src);
            setAvatar(src);
          }}
        >
          Save Avatar
        </button>
      )}
    </div>
  );
};

export default Settings;
