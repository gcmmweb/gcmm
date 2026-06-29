"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface MinistryContentBlockProps {
  blockType?: "text" | "image" | "video" | "button" | "text-image"
  heading?: string
  content?: string
  imageUrl?: string
  videoUrl?: string
  buttonText?: string
  buttonLink?: string
  imagePosition?: "left" | "right"
  className?: string
}

export function MinistryContentBlock({
  blockType = "text",
  heading = "Content Block",
  content = "<p>Add your content here...</p>",
  imageUrl,
  videoUrl,
  buttonText = "Click Here",
  buttonLink = "#",
  imagePosition = "right",
  className,
}: MinistryContentBlockProps) {
  // Helper function to extract video ID and platform
  const getVideoEmbed = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be")
        ? url.split("youtu.be/")[1]?.split("?")[0]
        : url.split("v=")[1]?.split("&")[0]
      return {
        platform: "youtube",
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
      }
    } else if (url.includes("vimeo.com")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0]
      return {
        platform: "vimeo",
        embedUrl: `https://player.vimeo.com/video/${videoId}`,
      }
    }
    return null
  }

  return (
    <Card className={cn("p-6", className)}>
      {/* Text Block */}
      {blockType === "text" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">{heading}</h2>
          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}

      {/* Image Block */}
      {blockType === "image" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">{heading}</h2>
          {imageUrl ? (
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <Image src={imageUrl || "/placeholder.svg"} alt={heading} fill className="object-cover" />
            </div>
          ) : (
            <div className="relative w-full h-96 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">No image provided</p>
            </div>
          )}
        </div>
      )}

      {/* Video Block */}
      {blockType === "video" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">{heading}</h2>
          {videoUrl ? (
            (() => {
              const videoData = getVideoEmbed(videoUrl)
              return videoData ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={videoData.embedUrl}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Invalid video URL</p>
                </div>
              )
            })()
          ) : (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">No video provided</p>
            </div>
          )}
        </div>
      )}

      {/* Button Block */}
      {blockType === "button" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">{heading}</h2>
          <div className="prose dark:prose-invert max-w-none mb-6" dangerouslySetInnerHTML={{ __html: content }} />
          <Button asChild size="lg">
            <a href={buttonLink}>{buttonText}</a>
          </Button>
        </div>
      )}

      {/* Text + Image Block */}
      {blockType === "text-image" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">{heading}</h2>
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-6 items-center",
              imagePosition === "left" && "md:grid-flow-dense",
            )}
          >
            <div
              className={cn("prose dark:prose-invert max-w-none", imagePosition === "left" && "md:col-start-2")}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {imageUrl ? (
              <div
                className={cn(
                  "relative w-full h-64 rounded-lg overflow-hidden",
                  imagePosition === "left" && "md:col-start-1 md:row-start-1",
                )}
              >
                <Image src={imageUrl || "/placeholder.svg"} alt={heading} fill className="object-cover" />
              </div>
            ) : (
              <div
                className={cn(
                  "relative w-full h-64 rounded-lg overflow-hidden bg-muted flex items-center justify-center",
                  imagePosition === "left" && "md:col-start-1 md:row-start-1",
                )}
              >
                <p className="text-muted-foreground">No image provided</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
