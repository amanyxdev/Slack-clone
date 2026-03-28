import Editor from "@/components/ui/editor"
import { useGetChannel } from "@/features/channels/api/use-get-channel"
import { useChannelId } from "@/hook/use-channel-id"


export const ChatInput = () => {
    const channelId = useChannelId();
    const { data: channel } = useGetChannel({ id: channelId });

    return (
        <div>
            <Editor
                placeholder={channel?.name ? `Message #${channel.name}` : "Message"}
                onSend={({ html, text }) => {
                    console.log("send message", { html, text })
                }}
            />
        </div>
    )
}
