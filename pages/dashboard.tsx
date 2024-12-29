import { useAuth } from "../context/AuthContext";
import { useMemo } from "react";
import {
	Box,
	Button,
	Heading,
	Text,
	VStack,
	HStack,
	Stack,
	useColorMode,
	Image,
} from "@chakra-ui/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function Dashboard() {
	const { user, logout } = useAuth();
	const { toggleColorMode, colorMode } = useColorMode();

	const localizer = momentLocalizer(moment);

	const myEventsList = useMemo(
		() => [
			{
				title: "first event",
				start: new Date("2024-12-17T12:00:00"),
				end: new Date("2024-12-17T20:00:00"),
				allDay: false,
			},
			{
				title: "second event",
				start: new Date("2024-12-18T12:00:00"),
				end: new Date("2024-12-18T20:00:00"),
				allDay: false,
			},
		],
		[]
	);

	const calendar = () => (
		<Box width="100%" height="100%" backgroundColor="white">
			<Calendar localizer={localizer} events={myEventsList} onDoubleClickEvent={(event) => console.log(event.title)} />
		</Box>
	);

	if (!user) {
		return (
			<Box p={8}>
				<Heading>Please Sign In</Heading>
			</Box>
		);
	}

	console.log(user);
	console.log(myEventsList);

	return (
		<VStack marginTop="15px" gap="0">
			<HStack
				justifyContent="space-between"
				width="100%"
				borderBottom="solid"
				borderColor="#880015"
				paddingBottom="10px"
			>
				<HStack gap="1.5rem" marginLeft="5px" flexBasis="45%">
					<Image src="/assets/tntlogo.png" width="148px" height="125px" />
					<Image src="/assets/kapsilogo.png" width="148px" height="125px" />
					<VStack gap="0" flex="1">
						<div style={{ fontFamily: "Josefin Sans", fontSize: "60px" }}>
							TNT NUPES
						</div>
						<div style={{ fontFamily: "Inter", fontSize: "16px" }}>
							Theta Theta, Kappa Alpha Psi Fraternity, Incorporated
						</div>
					</VStack>
				</HStack>
				<HStack gap="2.5rem">
					<Button
						bgColor="#FFFDD0"
						borderWidth="2px"
						borderColor="#880015"
						boxShadow="0px 4px 4px 0px #E0D2D3"
						width="140px"
						height="62px"
					>
						About Us
					</Button>
					<Button
						bgColor="#FFFDD0"
						borderWidth="2px"
						borderColor="#880015"
						boxShadow="0px 4px 4px 0px #E0D2D3"
						width="140px"
						height="62px"
					>
						Members
					</Button>
					<Button
						bgColor="#FFFDD0"
						borderWidth="2px"
						borderColor="#880015"
						boxShadow="0px 4px 4px 0px #E0D2D3"
						width="140px"
						height="62px"
					>
						Events/Calendar
					</Button>
					<Button
						bgColor="#FFFDD0"
						borderWidth="2px"
						borderColor="#880015"
						boxShadow="0px 4px 4px 0px #E0D2D3"
						width="140px"
						height="62px"
					>
						Donations
					</Button>
					<Button
						bgColor="#FFFDD0"
						borderWidth="2px"
						borderColor="#880015"
						boxShadow="0px 4px 4px 0px #E0D2D3"
						width="140px"
						height="62px"
					>
						Contact Us
					</Button>
				</HStack>
				<Button width="90px" height="75px" padding="0px" marginRight="20px">
					<Image src="/assets/profile.png" />
				</Button>
			</HStack>
			<VStack bgColor="#A41215" width="100%" height="83.9vh">
				<div
					style={{
						fontFamily: "Kite One",
						fontSize: "64px",
						color: "black",
						marginTop: "50px",
					}}
				>
					Welcome back {user.firstName}!
				</div>
				<HStack
					flex="1"
					width="100%"
					height="100%"
					justifyContent="space-around"
				>
					<VStack height="100%" width="100%">
						<div>Calendar of Events</div>
						{calendar()}
					</VStack>
					<VStack height="100%" width="100%">
						<div>Announcements/Updates</div>
					</VStack>
				</HStack>
				<Button onClick={toggleColorMode}>
					Switch to {colorMode === "light" ? "Dark" : "Light"} Mode
				</Button>
			</VStack>
		</VStack>
	);
}
