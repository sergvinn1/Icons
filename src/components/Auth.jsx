import React, { useState } from "react";
import { TextField, Button, Box, Typography, Divider, InputAdornment } from "@mui/material";
import { auth } from "../firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const Auth = ({ onAuthSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isPhoneAuth, setIsPhoneAuth] = useState(false);
  const [error, setError] = useState("");
  const [verificationId, setVerificationId] = useState(null);

  const initializeRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {},
        },
        auth
      );
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isPhoneAuth) {
        if (verificationId) {
          const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
          await signInWithCredential(auth, credential);
          onAuthSuccess();
        } else {
          initializeRecaptcha();
          const confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
          setVerificationId(confirmationResult.verificationId);
        }
      } else if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        onAuthSuccess();
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        onAuthSuccess();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onAuthSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        backgroundImage: "url('https://source.unsplash.com/random/1920x1080?city,night')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 4,
      }}
    >
      <Box 
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)", 
          padding: 4, 
          borderRadius: 3,
          boxShadow: "0px 8px 16px rgba(0,0,0,0.3)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: "#333" }}>
          {isRegistering ? "Реєстрація" : "Вхід"}
        </Typography>
        {error && <Typography color="error" align="center" mb={2}>{error}</Typography>}
        <form onSubmit={handleAuth}>
          {!isPhoneAuth ? (
            <>
              <TextField
                label="Електронна пошта"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#770007" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Пароль"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#770007" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </>
          ) : (
            <>
              <TextField
                label="Номер телефону"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 1 }}
                placeholder="+380123456789"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ color: "#770007" }} />
                    </InputAdornment>
                  ),
                }}
              />
              {verificationId && (
                <TextField
                  label="OTP"
                  variant="outlined"
                  fullWidth
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 1 }}
                />
              )}
              <div id="recaptcha-container"></div>
            </>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ 
              backgroundColor: "#770007", 
              mb: 2, 
              "&:hover": { backgroundColor: "#580005" },
              borderRadius: 1,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            {isPhoneAuth ? (verificationId ? "Підтвердити OTP" : "Отримати OTP") : (isRegistering ? "Зареєструватися" : "Увійти")}
          </Button>
        </form>
        <Divider sx={{ mb: 2 }} />
        <Button
          variant="outlined"
          startIcon={<GoogleIcon sx={{ color: "#DB4437", mr: 1 }} />}
          onClick={handleGoogleSignIn}
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: "#fff",
            color: "#000",
            borderColor: "#ddd",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
            borderRadius: 1,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Увійти за допомогою Google
        </Button>
        <Button
          color="secondary"
          fullWidth
          sx={{ 
            color: "#333", 
            mb: 2, 
            textTransform: "none",
            "&:hover": { color: "#770007", fontWeight: "bold" },
          }}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Вже маєте акаунт? Увійти" : "Немає акаунта? Зареєструватися"}
        </Button>
        <Button
          color="secondary"
          fullWidth
          sx={{ 
            color: "#333", 
            textTransform: "none",
            "&:hover": { color: "#770007", fontWeight: "bold" },
          }}
          onClick={() => setIsPhoneAuth(!isPhoneAuth)}
        >
          {isPhoneAuth ? "Використати електронну пошту та пароль" : "Увійти за допомогою телефону"}
        </Button>
      </Box>
    </Box>
  );
};

export default Auth;
