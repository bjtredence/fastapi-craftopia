import { Button } from "@/components/ui/button";
import { authService, type Provider } from "@/utils/authService";
import { 
  Github, 
  Mail, 
  Facebook, 
  Twitter 
} from "lucide-react";
import { toast } from "sonner";

const AuthButtons = () => {
  const handleAuth = async (provider: Provider) => {
    try {
      await authService.initAuth(provider);
    } catch (error) {
      toast.error(`Failed to initialize ${provider} authentication`);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <Button
        variant="outline"
        onClick={() => handleAuth('google')}
        className="flex items-center gap-2"
      >
        <Mail className="w-4 h-4" />
        Continue with Google
      </Button>

      <Button
        variant="outline"
        onClick={() => handleAuth('github')}
        className="flex items-center gap-2"
      >
        <Github className="w-4 h-4" />
        Continue with GitHub
      </Button>

      <Button
        variant="outline"
        onClick={() => handleAuth('facebook')}
        className="flex items-center gap-2"
      >
        <Facebook className="w-4 h-4" />
        Continue with Facebook
      </Button>

      <Button
        variant="outline"
        onClick={() => handleAuth('twitter')}
        className="flex items-center gap-2"
      >
        <Twitter className="w-4 h-4" />
        Continue with Twitter
      </Button>
    </div>
  );
};

export default AuthButtons;