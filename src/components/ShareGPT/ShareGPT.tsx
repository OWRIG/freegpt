import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useStore from "@store/store";

import PopupModal from "@components/PopupModal";
import { submitShareGPT } from "@api/api";
import { ShareGPTSubmitBodyInterface } from "@type/api";

const ShareGPT = React.memo(() => {
	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleConfirm = async () => {
		const chats = useStore.getState().chats;
		const currentChatIndex = useStore.getState().currentChatIndex;
		if (chats) {
			try {
				const items: ShareGPTSubmitBodyInterface["items"] = [];
				const messages = document.querySelectorAll(".share-gpt-message");

				messages.forEach((message, index) => {
					items.push({
						from: "gpt",
						value: `<p><b>${t(
							chats[currentChatIndex].messages[index].role,
						)}</b></p>${message.innerHTML}`,
					});
				});

				await submitShareGPT({
					avatarUrl: "",
					items,
				});
				setIsModalOpen(false);
			} catch (e: unknown) {
				console.log(e);
			}
		}
	};

	return null;
});

export default ShareGPT;
