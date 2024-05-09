import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import './App.css';
import Button from './Shared/Button/Button';
import { passwordGenerator } from './Utils/Utils';

export enum PasswordType {
  random = 'random',
  memorable = 'memorable',
  pin = 'pin'
}

export enum PasswordOptions {
  numbers = 'numbers',
  symbols = 'symbols'
}

export interface IFormInput {
  len: number | null;
  type: PasswordType;
  options: PasswordOptions[];
}

const App: React.FC<{}> = () => {
  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      len: null,
      type: PasswordType.random,
      options: []
    }
  })
  const onSubmit: SubmitHandler<IFormInput> = (formData) => {
    const group = [formData.type,...formData.options];

    const generatedPW = passwordGenerator(formData.len as number, group);

    setPassword(generatedPW);
  };
  const [password, setPassword] = useState('');

  return (
    <div className="App">
      <div className='App-form-wrapper'>
        <h1>
          Set Password Criteria
        </h1>
        <form className='App-form' onSubmit={(handleSubmit(onSubmit))}>
          <label className='App-form-label'>
            <div className='App-form-label-name'>
              Length
              <span className='App-form-label-required'>&#42;</span>
            </div>
            <input
              className='App-form-input--number'
              placeholder='0'
              type='number'
              {
                ...register('len', { required: true })
              }
            />
          </label>

          <label className='App-form-label'>
            <div className='App-form-label-name'>
              Type
              <span className='App-form-label-required'>&#42;</span>
            </div>
            <label className='App-form-label-subtype'>
              <input 
                className='App-form-radio' 
                type='radio' 
                value={PasswordType.random} 
                {...register('type')} 
                defaultChecked  
              />
              <div className='App-form-label-name-subtype'>
                {PasswordType.random}
              </div>
            </label>
            <label className='App-form-label-subtype disabled'>
              <input 
                disabled
                className='App-form-radio' 
                type='radio'  
                value={PasswordType.memorable} 
                {...register('type')} 
              />
              <div className='App-form-label-name-subtype'>
                {PasswordType.memorable}
              </div>
            </label>
            <label className='App-form-label-subtype disabled'>
              <input 
                disabled
                className='App-form-radio' 
                type='radio'  
                value={PasswordType.pin} 
                {...register('type')} 
              />
              <div className='App-form-label-name-subtype'>
                {PasswordType.pin}
              </div>
            </label>
          </label>

          <label className='App-form-label'>
            <div className='App-form-label-name'>Options</div>
            <label className='App-form-label-subtype'>
              <input 
                className='App-form-checkbox' 
                type='checkbox' 
                value={PasswordOptions.numbers} 
                {...register('options')} 
              />
              <div className='App-form-label-name-subtype'>
                {PasswordOptions.numbers}
                </div>
            </label>
            <label className='App-form-label-subtype'>
              <input 
                className='App-form-checkbox' 
                type='checkbox'
                value={PasswordOptions.symbols} 
                {...register('options')} 
              />
              <div className='App-form-label-name-subtype'>
                {PasswordOptions.symbols}
              </div>
            </label>
          </label>

          <Button
            text='Generate Password'
            click={(handleSubmit(onSubmit))}
          />
        </form>

      </div>

      <div className='App-pw-wrapper'>
        <label className='App-form-label'>
            <div className='App-form-label-name'>
              Generated Password
            </div>
            <input
              className='App-form-input--text'
              placeholder='1Password'
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();

                setPassword(e.target.value);
              }}
          />
        </label>
      </div>
    </div>
  );
}

export default App;
