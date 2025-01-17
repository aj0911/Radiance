export default interface User{
  email:string;
  password_hash:string;
  profile_image:string;
  full_name:string;
  username:string;
  dob:Date;
  phone_number:string;
  country:string;
  occupation:string;
  is_private:boolean;
  is_remember:boolean;
  is_verified:boolean;
  created_at:Date;
  update_at:Date;
  id:string;
}