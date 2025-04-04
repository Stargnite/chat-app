import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"



const ToolTipWrapper = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent className="z-50 bg-white text-gray-700 poppins-regular text-xs">
					<p>Right click</p>
				</TooltipContent>
			</Tooltip>

		</TooltipProvider>

	)
}

export default ToolTipWrapper
