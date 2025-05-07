import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { LockClosedIcon, EnvelopeIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext"; // Import the theme hook

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme(); // Use the theme context

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      className={`min-h-screen flex items-center justify-center p-4 ${
        darkMode ? 'bg-gray-900' : 'bg-slate-50'
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className={`w-full max-w-md shadow-lg ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-white border-slate-200'
      }`}>
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode 
                ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </div>
        
        <motion.div variants={itemVariants}>
          <CardHeader className="space-y-2 pb-6">
            <div className={`mx-auto p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2 ${
              darkMode ? 'bg-blue-700' : 'bg-blue-600'
            } text-white`}>
              <LockClosedIcon className="w-6 h-6" />
            </div>
            <CardTitle className={`text-center text-2xl font-semibold ${
              darkMode ? 'text-white' : 'text-slate-800'
            }`}>Welcome Back</CardTitle>
            <CardDescription className={`text-center ${
              darkMode ? 'text-gray-400' : 'text-slate-500'
            }`}>Enter your credentials to access your account</CardDescription>
          </CardHeader>
        </motion.div>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <motion.div 
                className={`border px-4 py-3 rounded-md text-sm ${
                  darkMode 
                    ? 'bg-red-900/30 border-red-800 text-red-300' 
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
            
            <motion.div className="space-y-2" variants={itemVariants}>
              <label className={`text-sm font-medium flex items-center gap-2 ${
                darkMode ? 'text-gray-300' : 'text-slate-700'
              }`}>
                <EnvelopeIcon className={`w-4 h-4 ${
                  darkMode ? 'text-gray-400' : 'text-slate-600'
                }`} /> Email Address
              </label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' 
                    : 'bg-white border-slate-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                required
              />
            </motion.div>
            
            <motion.div className="space-y-2" variants={itemVariants}>
              <div className="flex items-center justify-between">
                <label className={`text-sm font-medium flex items-center gap-2 ${
                  darkMode ? 'text-gray-300' : 'text-slate-700'
                }`}>
                  <LockClosedIcon className={`w-4 h-4 ${
                    darkMode ? 'text-gray-400' : 'text-slate-600'
                  }`} /> Password
                </label>
                <a href="#" className={`text-xs font-medium ${
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                }`}>Forgot password?</a>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' 
                    : 'bg-white border-slate-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                required
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="pt-2">
              <Button 
                type="submit" 
                className={`w-full font-medium py-2.5 rounded-md transition-colors duration-200 flex items-center justify-center ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
        
        <CardFooter className={`flex justify-center py-4 border-t ${
          darkMode ? 'border-gray-700' : 'border-slate-200'
        }`}>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-slate-600'
          }`}>
            Don't have an account? <a href="#" className={`font-medium ${
              darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
            }`}>Sign up</a>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default Login;