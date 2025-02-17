import React from 'react'
import {useState, useEffect} from "react"
import {useCurrentUser} from "../hooks/current-user"
import {useProfile} from "../hooks/profile"
import '../styles/home.css';

function ProfileForm() {
  const cu = useCurrentUser()
  const profile = useProfile(cu.addr)
  const [name, setName] = useState("")
  useEffect(() => {
    setName(profile.name)
  }, [profile.name])

  const submit = () => {
    profile.setName(name)
  }

  return (
    <div>
      <input className="ProfileRectangle" value={name} onChange={e => setName(e.target.value)} />
      {profile.isIdle && <button className="UpdateProfile" onClick={submit}>Update Name</button>}
      {profile.isProcessing && <span>PROCESSING</span>}
    </div>
  )
}

export function ProfileCluster({address}) {
  const profile = useProfile(address)
  //useEffect(() => profile.refetch(), [address])
  useEffect(() => {
    async function refetch(){
      profile.refetch();
    }
    refetch();
  }, [address, profile]) 

  if (address == null) return null

  return (
    <div className="Profile">
      {profile.isCurrentUser && <ProfileForm />}
      <ul>
        <li>
          <strong>My Name: </strong>
          <span>{profile.name}</span>
          {profile.isCurrentUser && <span></span>}
          {profile.isProcessing && <span>PROCESSING</span>}
        </li>
      </ul>
    </div>
  )
}