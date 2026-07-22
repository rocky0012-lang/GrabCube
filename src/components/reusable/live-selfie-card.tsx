import { useRef, useState } from 'react';
import { LoaderCircle, ScanFace } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LiveSelfieCardProps {
    onImageSelected?: (file: File) => void;
}

const LiveSelfieCard = ({ onImageSelected }: LiveSelfieCardProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [loadingCamera, setLoadingCamera] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [capturedSelfie, setCapturedSelfie] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const startCamera = async () => {
        if (cameraActive || loadingCamera || preview) return;

        console.log("1. startCamera called");
        try {
            setLoadingCamera(true);

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
            });

            console.log("2. stream obtained");

            console.log("3. videoRef.current:", videoRef.current);

            if (videoRef.current) {
                console.log("Video element exists, setting srcObject to stream");
                videoRef.current.srcObject = stream;
                console.log("stream attached")
                
                try {
                    await videoRef.current.play();
                    console.log("video started");
                } catch (err) {
                    console.error("video play failed:", err);
                }

                console.log("setting camera active...")
                setCameraActive(true);
            } else {
                console.log("❌ videoRef.current is null");
            }
        } catch {
            setCameraError("Camera permission denied. Please allow access to the camera.");
        } finally {
            setLoadingCamera(false);
        }
    };
    console.log("Preview:", preview);
    console.log("cameraActive:", cameraActive);
    
    const captureSelfie = () => {
            if (!videoRef.current || !canvasRef.current) return;

            const video = videoRef.current;
            const canvas = canvasRef.current;

            // Match the canvas size to the video size
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext("2d");

            if (!context) return;

            // Draw the video frame to the canvas
            context.save();
            context.translate(canvas.width, 0);
            context.scale(-1, 1);

            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            context.restore();

            // Convert the canvas to a Blob and then to a File
            canvas.toBlob((blob) => {
                if (!blob) return;

                // Create a File from the Blob
                const selfieFile = new File(
                    [blob],
                    "selfie.png",
                    { type: "image/png" }
                );


                
                // Create a preview URL for the captured selfie
                const previewUrl = URL.createObjectURL(selfieFile);
                
                //Save the captured selfie to state
                setCapturedSelfie(selfieFile);
                setPreview(previewUrl);
                console.log("preview URL:", previewUrl);

                const stream = video.srcObject as MediaStream | null;

                stream?.getTracks().forEach(track => track.stop());

                video.srcObject = null;

                setCameraActive(false);
                

                //Send the file to the parent Page
                onImageSelected?.(selfieFile);

                console.log("✅ Selfie captured and sent to parent component:", selfieFile);
            }, "image/png", 0.95);
            };

  return (
    <div className="flex flex-col items-center gap-4 pt-2">
        <h2 className="text-xl font-semibold">Capture Live Selfie</h2>
        <p className="max-w-sm text-center text-sm text-muted-foreground">
          Please ensure your face is clearly visible and well-lit for accurate verification
        </p>
        <div 
            className={`relative flex h-72 w-72 items-center justify-center overflow-hidden rounded-full bg-gray-900 shadow-[0_0_30px_rgba(212,175,55,0.15)] ${!preview ? "cursor-pointer hover:scale-[1.02]" : "cursor-default"} transition-all`}
            onClick={() => {
                if (!cameraActive && !preview) {
                    startCamera();
                }
            }}
            >
            <canvas
                ref={canvasRef}
                className="hidden"
            />
            {preview ? (
                <img
                    src={preview}
                        alt="Captured selfie"
                        className="h-full w-full rounded-full object-cover"
                />
                    ) : (
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`h-full w-full rounded-full object-cover scale-x-[-1] ${cameraActive ? "block" : "hidden"}`} 
            />)}

            {loadingCamera && (
                <LoaderCircle className="absolute z-30 size-12 animate-spin text-[var(--color-accent-gold)]" />
            )}
            { !cameraActive && !loadingCamera && (
                <ScanFace 
                    className="relative z-20 size-24 text-[var(--color-accent-gold)] opacity-90" />
            )}            
            
            { cameraActive && (
                <div className="absolute z-20 left-0 h-[3px] w-full bg-gradient-to-r from-transparent via-[var(--color-accent-gold)] to-transparent animate-scan-line" />
            )}
            
            <div className="absolute top-9 left-9 h-8 w-8 border-t-[5px] border-l-[5px] border-[var(--color-accent-gold)] rounded-tl-md" />
            <div className="absolute top-9 right-9 h-8 w-8 border-t-[5px] border-r-[5px] border-[var(--color-accent-gold)] rounded-tr-md" />
            <div className="absolute bottom-9 left-9 h-8 w-8 border-b-[5px] border-l-[5px] border-[var(--color-accent-gold)] rounded-bl-md" />
            <div className="absolute bottom-9 right-9 h-8 w-8 border-b-[5px] border-r-[5px] border-[var(--color-accent-gold)] rounded-br-md" />

        </div>
            <Button 
                type="button"
                onClick={captureSelfie}
                disabled={!cameraActive}
                className="w-full max-w-xs bg-[var(--color-accent-gold-light)] text-black hover:bg-[var(--color-accent-gold-dark)] focus:ring-[var(--color-accent-gold)] disabled:cursor-not-allowed disabled:opacity-50"
            >
                {preview ? "Retake Selfie" : "Capture Selfie"}
            </Button>
        <p className="text-center text-sm text-muted-foreground">
            {cameraError ?? "Tap to enable your camera"}
        </p>
        <div className="mt-2 flex items-center gap-2">
             <span className="h-2 w-2 rounded-full bg-[var(--color-accent-gold)]" />
            <div className="h-2 w-2 rounded-full bg-gray-400" />
            <div className="h-2 w-2 rounded-full bg-gray-400" />
        </div>
    </div>
  )
}  

export default LiveSelfieCard 


