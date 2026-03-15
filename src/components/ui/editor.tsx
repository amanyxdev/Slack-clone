import * as React from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Link from "@tiptap/extension-link"
import Emoji from "@tiptap/extension-emoji"
import { Bold, ImageIcon, Italic, Link2, List, ListOrdered, Send, Smile, X } from "lucide-react"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Props = {
    value?: string
    onChange?: (html: string) => void
    onSend?: (payload: { html: string; text: string; image?: File }) => void
    placeholder?: string
    disabled?: boolean
    className?: string
}

const Editor = ({
    value,
    onChange,
    onSend,
    placeholder = "Message...",
    disabled,
    className,
}: Props) => {
    const [isToolbarVisible, setIsToolbarVisible] = React.useState(true);
    const [isEmojiMenuOpen, setIsEmojiMenuOpen] = React.useState(false);
    const [image, setImage] = React.useState<File | null>(null);
    const imageInputRef = React.useRef<HTMLInputElement>(null);
    const emojiMenuRef = React.useRef<HTMLDivElement>(null);

    const editor = useEditor({
        immediatelyRender: false,
        editable: !disabled,
        extensions: [
            StarterKit.configure({
                heading: false,
                codeBlock: false,
                blockquote: false,
                horizontalRule: false,
            }),
            Placeholder.configure({ placeholder }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
                HTMLAttributes: {
                    class:
                        "underline underline-offset-2 text-foreground/90 hover:text-foreground",
                },
            }),
            Emoji,
        ],
        content: value ?? "",
        editorProps: {
            attributes: {
                class:
                    "prose prose-sm max-w-none focus:outline-none px-4 py-3 min-h-[80px]",
            },
        },
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML())
        },
    })

    React.useEffect(() => {
        if (!editor) return

        // Update placeholder dynamically if it changes
        const prevPlaceholder = editor.extensionManager.extensions.find(
            (e) => e.name === "placeholder"
        )?.options.placeholder

        if (prevPlaceholder !== placeholder) {
            editor.extensionManager.extensions.find(
                (e) => e.name === "placeholder"
            )!.options.placeholder = placeholder
            // Force re-render of placeholder
            editor.view.dispatch(editor.state.tr)
        }
    }, [editor, placeholder])

    React.useEffect(() => {
        if (!editor) return
        if (value === undefined) return
        if (value === editor.getHTML()) return
        editor.commands.setContent(value)
    }, [editor, value])

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiMenuRef.current && !emojiMenuRef.current.contains(event.target as Node)) {
                setIsEmojiMenuOpen(false);
            }
        };

        if (isEmojiMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.addEventListener("mousedown", handleClickOutside);
        };
    }, [isEmojiMenuOpen]);

    const canSend = (!!editor && editor.getText().trim().length > 0) || !!image;

    const send = () => {
        if (!editor || !canSend) return
        const html = editor.getHTML()
        const text = editor.getText()
        onSend?.({ html, text, image: image ?? undefined })
        editor.commands.clearContent(true)
        setImage(null)
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            send()
        }
    }

    const onEmojiSelect = (emoji: EmojiClickData) => {
        editor?.chain().focus().insertContent(emoji.emoji).run();
    }

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <div className="flex flex-col rounded-md border border-border bg-card shadow-sm focus-within:ring-1 focus-within:ring-ring focus-within:border-ring transition-colors">

                {isToolbarVisible && (
                    <div className="flex items-center gap-1 border-b border-border bg-muted/30 px-2 py-1 rounded-t-md">
                        {/* <Button */}
                        {/*     type="button" */}
                        {/*     variant="ghost" */}
                        {/*     size="iconSm" */}
                        {/*     className={cn( */}
                        {/*         "h-8 px-2 w-auto text-muted-foreground hover:text-foreground font-medium text-xs rounded-sm", */}
                        {/*         editor?.isActive("bold") || editor?.isActive("italic") || editor?.isActive("strike") */}
                        {/*             ? "bg-accent text-accent-foreground" : "" */}
                        {/*     )} */}
                        {/*     disabled={!editor || disabled} */}
                        {/* > */}
                        {/*     Normal */}
                        {/* </Button> */}
                        <div className="mx-0.5 h-4 w-px bg-border/60" />
                        <Button
                            type="button"
                            variant="ghost"
                            size="iconSm"
                            className={cn("h-8 w-8", editor?.isActive("bold") ? "bg-muted text-foreground" : "text-muted-foreground")}
                            disabled={!editor || disabled}
                            onClick={() => editor?.chain().focus().toggleBold().run()}
                            aria-pressed={editor?.isActive("bold")}
                        >
                            <Bold className="size-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="iconSm"
                            className={cn("h-8 w-8", editor?.isActive("italic") ? "bg-muted text-foreground" : "text-muted-foreground")}
                            disabled={!editor || disabled}
                            onClick={() => editor?.chain().focus().toggleItalic().run()}
                            aria-pressed={editor?.isActive("italic")}
                        >
                            <Italic className="size-4" />
                        </Button>
                        {/* Mocking strike/underline with just the Link button next to it for spacing as in screenshot */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="iconSm"
                            className={cn("h-8 w-8", editor?.isActive("link") ? "bg-muted text-foreground" : "text-muted-foreground")}
                            disabled={!editor || disabled}
                            onClick={() => {
                                const prev = editor?.getAttributes("link").href as
                                    | string
                                    | undefined
                                const href = window.prompt("Paste a link", prev ?? "")
                                if (href === null) return
                                if (!href) {
                                    editor?.chain().focus().unsetLink().run()
                                    return
                                }
                                editor?.chain().focus().setLink({ href }).run()
                            }}
                            aria-pressed={editor?.isActive("link")}
                        >
                            <Link2 className="size-4" />
                        </Button>
                        <div className="mx-0.5 h-4 w-px bg-border/60" />
                        <Button
                            type="button"
                            variant="ghost"
                            size="iconSm"
                            className={cn("h-8 w-8", editor?.isActive("bulletList") ? "bg-muted text-foreground" : "text-muted-foreground")}
                            disabled={!editor || disabled}
                            onClick={() => editor?.chain().focus().toggleBulletList().run()}
                            aria-pressed={editor?.isActive("bulletList")}
                        >
                            <List className="size-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="iconSm"
                            className={cn("h-8 w-8", editor?.isActive("orderedList") ? "bg-muted text-foreground" : "text-muted-foreground")}
                            disabled={!editor || disabled}
                            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                            aria-pressed={editor?.isActive("orderedList")}
                        >
                            <ListOrdered className="size-4" />
                        </Button>
                    </div>
                )}

                <div className="flex-1">
                    <EditorContent onKeyDown={onKeyDown} editor={editor} />
                    {!!image && (
                        <div className="p-2">
                            <div className="relative size-[62px] flex items-center justify-center group/image">
                                <Button
                                    onClick={() => {
                                        setImage(null);
                                        imageInputRef.current!.value = "";
                                    }}
                                    className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center p-0"
                                    type="button"
                                    size="icon"
                                >
                                    <X className="size-3.5" />
                                </Button>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Uploaded image"
                                    className="rounded-xl overflow-hidden border object-cover size-full"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between px-2 pb-2 mt-1">
                    <div className="flex items-center gap-1">
                        <Button
                            type="button"
                            variant="ghost"
                            size="iconSm"
                            className={cn(
                                "h-8 w-8 text-muted-foreground hover:text-foreground",
                                isToolbarVisible ? "bg-accent/50 text-accent-foreground" : ""
                            )}
                            disabled={!editor || disabled}
                            onClick={() => setIsToolbarVisible(!isToolbarVisible)}
                            title="Format text"
                        >
                            <span className="font-semibold text-sm">Aa</span>
                        </Button>
                        <div className="relative" ref={emojiMenuRef}>
                            <Button
                                type="button"
                                variant="ghost"
                                size="iconSm"
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                disabled={!editor || disabled}
                                onClick={() => setIsEmojiMenuOpen((prev) => !prev)}
                                title="Insert emoji"
                            >
                                <Smile className="size-5" />
                            </Button>

                            {isEmojiMenuOpen && (
                                <div className="absolute bottom-full left-0 mb-2 z-50">
                                    <EmojiPicker height={350} onEmojiClick={onEmojiSelect} />
                                </div>
                            )}
                        </div>

                        <Button
                            type="button"
                            variant="ghost"
                            size="iconSm"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            disabled={disabled}
                            onClick={() => imageInputRef.current?.click()}
                            title="Gallery"
                        >
                            <ImageIcon className="size-5" />
                        </Button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={imageInputRef}
                            onChange={(e) => {
                                if (e.target.files?.[0]) setImage(e.target.files[0])
                            }}
                            className="hidden"
                        />
                    </div>

                    <Button
                        type="button"
                        size="iconSm"
                        className={cn(
                            "h-7 w-7 transition-colors rounded-sm",
                            canSend
                                ? "bg-[#007a5a] hover:bg-[#148567] text-white"
                                : "bg-muted text-muted-foreground"
                        )}
                        disabled={!canSend}
                        onClick={send}
                    >
                        <Send className="size-3.5" />
                    </Button>
                </div>
            </div>

            {editor?.getText().length ? (
                <div className="flex justify-end pr-1 -mt-1">
                    <span className="text-[10px] text-muted-foreground/60 hidden sm:inline-block">
                        <strong>Shift + Return</strong> to add a new line
                    </span>
                </div>
            ) : null}
        </div>
    )
}

export default Editor
